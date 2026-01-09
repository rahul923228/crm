package com.crm.unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepo extends  JpaRepository<UnitEntity, Long> {
    
}
