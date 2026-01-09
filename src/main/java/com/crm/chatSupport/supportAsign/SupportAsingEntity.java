package com.crm.chatSupport.supportAsign;

import java.time.LocalDate;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.customer.CustomerEntity;
import com.crm.customerSupport.TicketEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="ticketAsign")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupportAsingEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    String status;

    @ManyToOne
    @JoinColumn(name="ticket_id")
    TicketEntity ticketEntity;

      @ManyToOne
    @JoinColumn(name="emp_id")
    EmpBasicEntity basicEntity;

    @ManyToOne
    @JoinColumn(name="customer_id")
    CustomerEntity customerEntity;

    private LocalDate assignedDate;


    @PrePersist
    public void onCreate(){
        assignedDate=LocalDate.now();
    }
    
}
