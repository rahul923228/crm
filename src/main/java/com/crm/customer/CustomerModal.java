package com.crm.customer;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerModal {
    
    Long id;
    private String customerName;
    private String email;
    private String number;
    private String address;
    private String stutes;
     private String industryType;
     LocalDate createdDate;

     private Long user_id;

}
