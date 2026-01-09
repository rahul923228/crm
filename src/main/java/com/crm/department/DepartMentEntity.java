package com.crm.department;

import com.crm.Employee.WorkDetails.EmpWorkEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="department")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartMentEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;


    String departmentName;


    @ManyToOne
    @JoinColumn(name="department_id")
    private EmpWorkEntity workEntity;
}
