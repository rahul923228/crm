package com.crm.department;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepo extends JpaRepository<DepartMentEntity, Long>{

  Optional<DepartMentEntity> findByDepartmentName(String department);
    
}
