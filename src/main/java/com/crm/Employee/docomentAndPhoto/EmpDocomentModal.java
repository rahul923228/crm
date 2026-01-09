package com.crm.Employee.docomentAndPhoto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpDocomentModal {
    
   private Long id;

    private byte[] docoment;

    private byte[] profile;

    private boolean firstLogin;

    private boolean profileCompled;

    private Long basicId;

  


}
