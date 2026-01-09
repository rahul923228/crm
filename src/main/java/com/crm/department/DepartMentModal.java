package com.crm.department;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartMentModal {
    
  private  Long id;

    private String departmentName;
    private Long department_id;

}
