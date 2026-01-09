package com.crm.Employee;

import com.crm.Employee.BasicDetails.EmpBasicModal;
import com.crm.Employee.FaimlyDetails.EmpFamilyModal;
import com.crm.Employee.WorkDetails.EmpWorkModal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeCreateRequest {
   
    private EmpBasicModal basic;
    private EmpFamilyModal family;
    private EmpWorkModal work;

}
