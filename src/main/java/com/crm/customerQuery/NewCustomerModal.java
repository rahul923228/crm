package com.crm.customerQuery;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewCustomerModal {
    Long id;
    String name;
    String number;
    String email;
   String status;
   LocalDateTime created_at;
   LocalDateTime updated_at;
}
