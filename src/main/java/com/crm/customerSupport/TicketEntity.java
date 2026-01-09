package com.crm.customerSupport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.crm.chatSupport.ChatEntity;
import com.crm.chatSupport.supportAsign.SupportAsingEntity;
import com.crm.customer.CustomerEntity;
import com.crm.project.task.TaskEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="ticket")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
     Long id;
    String title;
    String customerName;
    String projectName;
    String description;
    String priority;
    String status;
    LocalDate deliveryDate;
    LocalDateTime createdTicket;
    private String remark;

    @PrePersist
    protected void onCreate(){
        if(createdTicket==null){
            createdTicket=LocalDateTime.now();
        }
    }

    @ManyToOne
    @JoinColumn(name="project_id")
    private TaskEntity project;

    @ManyToOne
    @JoinColumn(name="customer_id")
    private CustomerEntity customer;

    @OneToMany(mappedBy="ticket")
    private List<ChatEntity> chatList;

    @OneToMany(mappedBy="ticketEntity")
    private List<SupportAsingEntity> asignTicketList;
 
}
