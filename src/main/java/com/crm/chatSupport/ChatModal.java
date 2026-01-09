package com.crm.chatSupport;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatModal {
    
   private Long id;
    private String sender;
    private String message;
    private String senderName;
    private LocalDateTime createdAt;

    
private String fileName;


private String fileUrl;

private String fileType; // IMAGE / PDF / DOC

}
