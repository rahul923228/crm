package com.crm.setting;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="setting")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpPerEntity {
    
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  private Long empId;

  // Which layout employee can access
  private String layout; // ADMIN | SUPPORT | SALES

  // Permissions
  private boolean viewTickets;
  private boolean replyTickets;
  private boolean closeTickets;

  private boolean viewProjects;
  private boolean addTasks;

  private boolean viewCustomers;
  
}
