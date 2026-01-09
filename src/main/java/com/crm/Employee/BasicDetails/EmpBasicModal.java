package com.crm.Employee.BasicDetails;

import java.util.Date;
import java.util.List;

import com.crm.Employee.FaimlyDetails.EmpFamilyModal;
import com.crm.Employee.WorkDetails.EmpWorkEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpBasicModal {

 Long id;

 String  userName;

 String gender;

 Date dob;

 String mobile_number;

 String email;

 String marital_status;

Date  date_of_joining;

String employee_status;

List<EmpFamilyModal> familyList;

List<EmpWorkEntity> workList;

Long userId;

}


