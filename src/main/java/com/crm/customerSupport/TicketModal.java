package com.crm.customerSupport;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketModal {
    
    Long id;
    private String title;
    String description;
    String priority;
    String status;
    LocalDate deliveryDate;
    LocalDateTime createdTicket;
   private String sender;
     String customerName;
     private String remark;
    String projectName;
    private String time;

    Long project_id;
    Long customer_id;

   
}
