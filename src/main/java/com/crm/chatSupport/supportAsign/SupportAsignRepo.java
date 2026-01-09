package com.crm.chatSupport.supportAsign;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.customerSupport.TicketEntity;

@Repository
public interface  SupportAsignRepo extends  JpaRepository<SupportAsingEntity, Long> {
    
    boolean existsByTicketEntityAndBasicEntity(TicketEntity ticketEntity,EmpBasicEntity basicEntity);
}
