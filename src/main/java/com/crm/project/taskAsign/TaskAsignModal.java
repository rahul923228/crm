package com.crm.project.taskAsign;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskAsignModal {
    
    Long id;
    Long task_id;
    Long emp_id;
    Long customer_id;
    String status;
    LocalDate assignedDate;

}
