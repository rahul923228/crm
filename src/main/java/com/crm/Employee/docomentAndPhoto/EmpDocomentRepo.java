package com.crm.Employee.docomentAndPhoto;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crm.Employee.BasicDetails.EmpBasicEntity;

@Repository
public interface EmpDocomentRepo extends JpaRepository<EmpDocomentEntity, Long>{
    
    Optional<EmpDocomentEntity> findByBasic(EmpBasicEntity basicEntity);
   
}
