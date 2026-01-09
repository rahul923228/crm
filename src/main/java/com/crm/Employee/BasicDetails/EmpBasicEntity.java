package com.crm.Employee.BasicDetails;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.crm.Employee.FaimlyDetails.EmpFamilyEntity;
import com.crm.Employee.WorkDetails.EmpWorkEntity;
import com.crm.Employee.docomentAndPhoto.EmpDocomentEntity;
import com.crm.User.UserEntity;
import com.crm.project.taskAsign.TaskAsignEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="emp_basic")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpBasicEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

 String  userName;

 String gender;


 @DateTimeFormat(pattern="DD/MM/YYYY")
 Date dob;

 String mobile_number;

 String email;

 String marital_status;

@DateTimeFormat(pattern="DD/MM/YYYY")
Date  date_of_joining;

String employee_status;

@OneToMany(mappedBy="basic",fetch=FetchType.LAZY,orphanRemoval = true)
private List<EmpFamilyEntity> familyEntity;



@OneToMany(mappedBy = "basic",fetch = FetchType.EAGER,orphanRemoval = true)
private List<EmpWorkEntity> workEntity;



@OneToMany(mappedBy = "basic",fetch = FetchType.LAZY)
private List<EmpDocomentEntity> docomentEntity;


@ManyToOne
@JoinColumn(name="user_id")
private UserEntity user;


@OneToMany(mappedBy = "basicEntity")
private List<TaskAsignEntity> taskAsignList;

}