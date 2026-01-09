package com.crm.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRepo  extends  JpaRepository<PasswordEntity, Long> {
    
}
