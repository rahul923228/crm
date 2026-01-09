package com.crm.customerQuery.query;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  QueryRepo extends JpaRepository<QueryEntity, Long>{
    
}
