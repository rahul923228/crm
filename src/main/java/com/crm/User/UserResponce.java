package com.crm.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponce {

    private String token;
    private String role;
    private String userName;

    private Long userId;
    private Long customerId;

    private Long EmpId;
}
