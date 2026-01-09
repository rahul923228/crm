package com.crm.chatSupport;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crm.customerSupport.TicketRepo;



@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService service;

    private ChatRepo repo;
    TicketRepo ticketRepo;

    public ChatController(ChatService service,ChatRepo repo,TicketRepo ticketRepo) {
        this.service = service;
        this.repo=repo;
        this.ticketRepo=ticketRepo;
    }

    @PostMapping("/upload/{ticketId}")
    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER','EMPLOYEE')")
    public ResponseEntity<?> addChat(
            @RequestParam(value = "message", required = false) String message,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @PathVariable Long ticketId,
            @RequestParam("senderName") String senderName
    ) throws IOException {

        service.addChat(message, file, ticketId, senderName);

        return ResponseEntity.ok("Chat added successfully");
    }

    @GetMapping("/getChat/{ticketId}")
    public List<ChatModal> getChats(@PathVariable Long ticketId) {
        return service.getChats(ticketId);
    }

}