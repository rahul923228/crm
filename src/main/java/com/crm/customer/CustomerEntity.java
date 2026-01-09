package com.crm.customer;

import java.time.LocalDate;
import java.util.List;

import com.crm.User.UserEntity;
import com.crm.customerSupport.TicketEntity;
import com.crm.project.task.TaskEntity;
import com.crm.project.taskAsign.TaskAsignEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerEntity {
    

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
     Long id;
    private String customerName;
    private String email;
    private String number;
    private String address;
    private String stutes;
     private String industryType;
     LocalDate createdDate;

     private String remark;

     @ManyToOne
     @JoinColumn(name="user_id")
     private  UserEntity userEntity;

     @OneToMany(mappedBy="customerEntity")
     private List<TaskAsignEntity> taskAsignList;

     @OneToMany(mappedBy="customerEntity")
     private List<TaskEntity> taskList;

     @OneToMany(mappedBy="customer")
     private List<TicketEntity>ticketList;

}
