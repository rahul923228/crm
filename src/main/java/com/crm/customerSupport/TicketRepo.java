package com.crm.customerSupport;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.crm.customer.CustomerEntity;


@Repository
public interface TicketRepo extends JpaRepository<TicketEntity, Long>{

    List<TicketEntity> findByCustomer_Id(Long customerId);


    Optional<TicketEntity> findByProject_id(Long id);
    
}
