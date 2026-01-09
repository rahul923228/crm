package com.crm.customer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<CustomerEntity, Long> {

    Optional<CustomerEntity> findByUserEntity_Id(Long userId);
}
