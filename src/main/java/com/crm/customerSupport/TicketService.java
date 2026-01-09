package com.crm.customerSupport;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.chatSupport.ChatService;
import com.crm.chatSupport.supportAsign.SupportAsignService;
import com.crm.customer.CustomerEntity;
import com.crm.customer.CustomerRepo;
import com.crm.project.task.TaskEntity;
import com.crm.project.task.TaskRepo;

@Service
public class TicketService {
    
    TicketRepo ticketRepo;
    TaskRepo projectRepo;
    CustomerRepo customerRepo;
    SupportAsignService service;
    ChatService chatService;

    public TicketService(CustomerRepo customerRepo, TaskRepo projectRepo, TicketRepo ticketRepo,SupportAsignService service,ChatService chatService) {
        this.customerRepo = customerRepo;
        this.projectRepo = projectRepo;
        this.ticketRepo = ticketRepo;
        this.service=service;
        this.chatService=chatService;
    }


    public ResponseEntity<?> addTicket(TicketModal modal,Long customerId,Long projectId) throws IOException{
        
        CustomerEntity customerEntity=customerRepo.findById(customerId).orElseThrow(()-> new RuntimeException("customer not found"));

        TaskEntity taskEntity=projectRepo.findById(projectId).orElseThrow(() -> new RuntimeException("projectNot founde"));
   
   
        TicketEntity ticketEntity=new TicketEntity();


        BeanUtils.copyProperties(modal, ticketEntity,"customer","project");
        ticketEntity.setCustomerName(customerEntity.getCustomerName());
        ticketEntity.setProjectName(taskEntity.getName());
        ticketEntity.setTitle(modal.getTitle());

        ticketEntity.setCustomer(customerEntity);
        ticketEntity.setProject(taskEntity);
        ticketRepo.save(ticketEntity);

        List<Long> empIds = service.getSupportAsign(projectId, customerId);
        if (!empIds.isEmpty()) {
            service.asignTicket(customerId, ticketEntity.getId(), empIds);
        }

        // 3️⃣ Add system chat
        chatService.addChat("Our team will contact you in 10 minutes",
         null, projectId, "SYSTEM");


        
 return ResponseEntity.ok(ticketEntity);
   
    }


     public List<TicketModal> getTicketByCustomerId(Long customerId) {

    List<TicketEntity> list = ticketRepo.findByCustomer_Id(customerId);

    if (list.isEmpty()) {
        return Collections.emptyList();
    }

    List<TicketModal> modalList = new ArrayList<>();

    for (TicketEntity entity : list) {

        TicketModal modal = new TicketModal();
        modal.setId(entity.getId());
        modal.setTitle(entity.getTitle());
        modal.setDescription(entity.getDescription());
        modal.setPriority(entity.getPriority());
        modal.setStatus("In-progresss");
        modal.setDeliveryDate(entity.getDeliveryDate());
        modal.setCreatedTicket(entity.getCreatedTicket());
        modal.setCustomer_id(entity.getCustomer().getId());
        modal.setProject_id(entity.getProject().getId());
        modal.setCustomerName(entity.getCustomerName());
        modal.setProjectName(entity.getProjectName());

        modalList.add(modal);
    }

    return modalList;
}

public List<TicketModal>getAll(){

List<TicketEntity> entitys=ticketRepo.findAll();

List<TicketModal>list=new ArrayList<>();

entitys.stream().forEach(entity->{

    TicketModal modal=new TicketModal();

    BeanUtils.copyProperties(entity, modal);
    modal.setCustomerName(entity.getCustomerName());
    modal.setProjectName(entity.getProjectName());
    modal.setProject_id(entity.getProject().getId());
    modal.setCustomer_id(entity.getCustomer().getId());
    
    list.add(modal);

});

return list;
}


public ResponseEntity<?> updateStatus(Long ticketId,String status){

TicketEntity entity=ticketRepo.findById(ticketId).orElseThrow(() ->  new RuntimeException("ticket not found"));

entity.setStatus(status);

ticketRepo.save(entity);

return ResponseEntity.ok("update success");

}


}
