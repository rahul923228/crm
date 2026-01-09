package com.crm.customerQuery;

import java.time.LocalDateTime;

import com.crm.customerQuery.query.QueryEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;



@Entity
@Table(name="NewCustomer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewCustomerEntity{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
     Long id;
    String name;
    String number;
    String email;
   String status;
   LocalDateTime created_at;
   LocalDateTime updated_at;

   @OneToMany(mappedBy="newCustomerEntity")
   List<QueryEntity> queryList;


   @PrePersist
   public void onCreate(){
    created_at=LocalDateTime.now();
    updated_at=LocalDateTime.now();
   }

   @PreUpdate
   public void onUpdate(){
  updated_at=LocalDateTime.now();
   }
}