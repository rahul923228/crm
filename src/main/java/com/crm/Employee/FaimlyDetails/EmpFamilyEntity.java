package com.crm.Employee.FaimlyDetails;

import com.crm.Employee.BasicDetails.EmpBasicEntity;

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
@Table(name="emp_family")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpFamilyEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    String  father_name;

    String mother_name;
    
    String emergency_contect_name;
    
    String emergency_contact_relation;
    
    String emergency_contact_number;

    
    @ManyToOne
    @JoinColumn(name="emp_basic_id")
    private EmpBasicEntity basic;
}
