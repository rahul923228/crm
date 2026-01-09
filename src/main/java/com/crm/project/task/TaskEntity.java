package com.crm.project.task;

import java.time.LocalDate;
import java.util.List;

import com.crm.User.UserEntity;
import com.crm.customer.CustomerEntity;
import com.crm.customerSupport.TicketEntity;
import com.crm.project.taskAsign.TaskAsignEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "task")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskEntity {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      Long id;

      private String name;
      private String type;
      private String description;
      private String deadline;
      private String budget;
      private String priority;
      private String status;
      private String remark;
      private LocalDate createdAt = LocalDate.now();

      @PrePersist
      protected void onCreate(){

            if(createdAt==null){
                  createdAt=LocalDate.now();
            }
      }

      @ManyToOne
      @JoinColumn(name = "user_id")
      private UserEntity user;

      @ManyToOne
      @JoinColumn(name = "customer_id")
      private CustomerEntity customerEntity;

      @OneToMany(mappedBy = "taskEntity")
      List<TaskAsignEntity> taskAsignList;


      @OneToMany(mappedBy="project",fetch=FetchType.LAZY)
      List<TicketEntity>ticketList;
}
