package com.crm.setting;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpPerModal{

     String layout;

    boolean viewTickets;
    boolean replyTickets;
     boolean closeTickets;

     boolean viewProjects;
     boolean addTasks;

     boolean viewCustomers;
}