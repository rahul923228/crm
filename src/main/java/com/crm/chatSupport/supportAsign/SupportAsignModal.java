package com.crm.chatSupport.supportAsign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupportAsignModal {

    Long id;
    Long ticket_id;
    Long emp_id;
    String status;
    Long customer_id;
    
}
