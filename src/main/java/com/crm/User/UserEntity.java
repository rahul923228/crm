package com.crm.User;

import java.util.List;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.customer.CustomerEntity;
import com.crm.project.task.TaskEntity;
import com.crm.unit.UnitEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserEntity {
    

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @Column(name = "user_name", unique = true, nullable = false)
    @JsonProperty("userName")
     private String userName;

   
    
    String password;

     String role;

    boolean active=true;

    @OneToMany(mappedBy="user",fetch=FetchType.LAZY)
    private List<EmpBasicEntity> basicEntity;

    @OneToMany(mappedBy="user",fetch=FetchType.LAZY)
    private List<TaskEntity> taskEntity;

    @OneToMany(mappedBy="userEntity",fetch=FetchType.LAZY)
    private List<CustomerEntity> customerList;

    
    @OneToMany(mappedBy="userEntity",fetch=FetchType.LAZY)
    private List<UnitEntity> unitEntity;

}
