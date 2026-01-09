package com.crm.Employee.FaimlyDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpFamilyModal {
    
    Long id;
  String  father_name;

  String mother_name;

  String emergency_contect_name;

String emergency_contact_relation;

String emergency_contact_number;

private Long basicId;
}
