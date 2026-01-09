package com.crm.customerQuery.query;

import java.time.LocalDateTime;
import java.util.List;

import com.crm.customerQuery.NewCustomerEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="customerQuery")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryEntity {
    

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
      Long id;
String projectName;
String discussion;
LocalDateTime call_date;
String deal_status;
LocalDateTime next_followup;
LocalDateTime created_at;
LocalDateTime updated_at;
private String remark;

@ManyToOne
@JoinColumn(name="newCustomer_id")
NewCustomerEntity newCustomerEntity;


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

