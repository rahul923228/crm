package com.crm.chatSupport;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.crm.customerSupport.TicketEntity;
import com.crm.customerSupport.TicketRepo;

@Service
public class ChatService {
    
    ChatRepo  chatRepo;
    TicketRepo ticketRepo;

    public ChatService(ChatRepo chatRepo,TicketRepo ticketRepo) {
        this.chatRepo = chatRepo;
        this.ticketRepo=ticketRepo;
    }


    // public ResponseEntity<?> addChat(ChatModal modal, Long ticketId) {

    // TicketEntity ticketEntity = ticketRepo.findById(ticketId)
    //     .orElseThrow(() -> new RuntimeException("ticket not found"));

    // // 1️⃣ CUSTOMER MESSAGE
    // ChatEntity entity = new ChatEntity();
    // entity.setMessage(modal.getMessage());
    // entity.setSenderName(modal.getSenderName());

    // entity.setTicket(ticketEntity);

    // ChatEntity savedChat = chatRepo.save(entity);

    // // 2️⃣ AUTO SYSTEM MESSAGE (ONLY FIRST CHAT)
    // long chatCount = chatRepo.countByTicket_Id(ticketId);

    // if (chatCount == 1) {
    //     ChatEntity systemMsg = new ChatEntity();
    //     systemMsg.setMessage(
    //         "Ticket created successfully. Our support team will contact you within 10 minutes."
    //     );
    //     systemMsg.setSenderName("SYSTEM");

    //     systemMsg.setTicket(ticketEntity);

    //     chatRepo.save(systemMsg); // 🔥 MOST IMPORTANT
    // }

    // return ResponseEntity.ok().build();}


    public List<ChatModal> getChats(Long ticketId){

       List<ChatEntity> chatList=  chatRepo.findByTicket_IdOrderByCreatedAtAsc(ticketId);
      System.out.println("Chats found: " + chatList.size());

   // TicketEntity ticketEntity=ticketRepo.findById(ticketId).orElseThrow(() -> new RuntimeException("ticket not found"));

   // List<ChatEntity> chatList= ticketEntity.getChatList();

      List<ChatModal>modalList=new ArrayList<>();

      chatList.stream().forEach(entity->{

        ChatModal modal=new ChatModal();

        System.out.println("msg"+entity.getMessage());
      BeanUtils.copyProperties(entity, modal,"ticket");
        modalList.add(modal);

      });


      return modalList;
        
    }

    public ResponseEntity<?> addChat(String message, MultipartFile file, Long ticketId, String senderName) throws IOException {
      
         TicketEntity ticketEntity = ticketRepo.findById(ticketId)
        .orElseThrow(() -> new RuntimeException("ticket not found"));

        ChatEntity chat =new ChatEntity();
          chat.setSenderName(senderName);
          chat.setCreatedAt(LocalDateTime.now());
          chat.setTicket(ticketEntity);

        // message
        if (message != null && !message.isEmpty()) {
            chat.setMessage(message);
        }

        // file
        if (file != null) {
            String uploadDir = "C:/crm_uploads/chat/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("\\s+", "_");
            File serverFile = new File(dir, fileName);
            file.transferTo(serverFile);

            chat.setFileName(file.getOriginalFilename());
            chat.setFileUrl("/files/chat/" + fileName);
            chat.setFileType(file.getContentType());
        }

        chatRepo.save(chat);

        return ResponseEntity.ok("data add success");
    }
}
