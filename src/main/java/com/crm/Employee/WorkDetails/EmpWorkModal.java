package com.crm.Employee.WorkDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpWorkModal {
    
    Long id;
    
  String departmentName;

String designation;

String reporting_manager;

String employment_type ;

String work_location;

String shift_timing;

String work_mode ;

private Long basicId;

private Long departmentId;
}
