package com.crm.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  UserRepo extends  JpaRepository<UserEntity, Long>{

   Optional<UserEntity> findByUserName(String userName);

   boolean existsByUserName(String userName);
    
}
