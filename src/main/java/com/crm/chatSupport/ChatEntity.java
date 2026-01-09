package com.crm.chatSupport;

import java.time.LocalDateTime;

import com.crm.customerSupport.TicketEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

   
    private String senderName ;// CUSTOMER / SYSTEM / ADMIN

    @ManyToOne
    private TicketEntity ticket;

    
private String fileName;


private String fileUrl;

private String fileType; // IMAGE / PDF / DOC


    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    public void onCreate(){
        if(createdAt==null){
            createdAt=LocalDateTime.now();
        }
    }
}
