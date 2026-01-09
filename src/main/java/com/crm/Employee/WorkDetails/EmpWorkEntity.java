package com.crm.Employee.WorkDetails;

import java.util.List;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.department.DepartMentEntity;

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
@Table(name="emp_work")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpWorkEntity {
    
     
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
   Long id;
 
   String department;

String designation;

String reporting_manager;

String employment_type ;

String work_location;

String shift_timing;

String work_mode ;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name="emp_work_id")
private EmpBasicEntity  basic;

@OneToMany(mappedBy="workEntity")
private List<DepartMentEntity> departmentList;

}
