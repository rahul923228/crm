package com.crm.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="password")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
     String userName;
    String password;
    
}
