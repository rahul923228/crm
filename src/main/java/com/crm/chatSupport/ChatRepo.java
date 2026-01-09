package com.crm.chatSupport;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepo  extends  JpaRepository<ChatEntity, Long>{
     List<ChatEntity> findByTicket_IdOrderByCreatedAtAsc(Long ticketId);
      long countByTicket_Id(Long ticketId);
}
