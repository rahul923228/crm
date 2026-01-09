package com.crm.project.task;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TaskModal {

   Long id;
   private String name;
   private String type;
   private String description;
   private String deadline;
   private String budget;
   private String priority;
    private String status;
   private String remark;
   private LocalDate createdAt;

   Long user_id;
   Long customer_id;
}
