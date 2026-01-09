package com.crm.unit;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnitModal {
    
    Long id;

   private String companyName;

    private String companyCode;          // Optional (CRM001, COMP01)

    private String email;
    private String phone;

    private String address;

    private String website;

    private String industryType;          // IT, Finance, Healthcare

    private String status;                // ACTIVE / INACTIVE

    private LocalDate createdDate;

    Long unit_id;
    
}
