package com.crm.setting;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  EmpPerRepo extends JpaRepository<EmpPerEntity, Long>{

Optional<EmpPerEntity> findByEmpId(Long empId);
    
}
