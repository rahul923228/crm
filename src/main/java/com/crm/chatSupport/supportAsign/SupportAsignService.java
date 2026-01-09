package com.crm.chatSupport.supportAsign;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.Employee.BasicDetails.EmpBasicRepo;
import com.crm.customer.CustomerEntity;
import com.crm.customer.CustomerRepo;
import com.crm.customerSupport.TicketEntity;
import com.crm.customerSupport.TicketRepo;

@Service
public class SupportAsignService {
    

    SupportAsignRepo repo;
    TicketRepo ticketRepo;
    EmpBasicRepo basicRepo;
    CustomerRepo customerRepo;

    public SupportAsignService(EmpBasicRepo basicRepo, SupportAsignRepo repo, TicketRepo ticketRepo,CustomerRepo customerRepo) {
        this.basicRepo = basicRepo;
        this.repo = repo;
        this.ticketRepo = ticketRepo;
        this.customerRepo=customerRepo;
    }

   


    public ResponseEntity<?> asignTicket(
        Long customerId,
        Long ticketId,
        List<Long> empIds
) {

    CustomerEntity customer =
        customerRepo.findById(customerId)
        .orElseThrow(() -> new RuntimeException("Customer not found"));

    TicketEntity ticket =
        ticketRepo.findById(ticketId)
        .orElseThrow(() -> new RuntimeException("Ticket not found"));

    // 🔒 Security check
    if (!ticket.getCustomer().getId().equals(customerId)) {
        throw new RuntimeException("Ticket does not belong to this customer");
    }

    for (Long empId : empIds) {

        EmpBasicEntity emp =
            basicRepo.findById(empId)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        boolean exists =
            repo.existsByTicketEntityAndBasicEntity(ticket, emp);

        if (exists) continue;

        SupportAsingEntity entity = new SupportAsingEntity();
        entity.setTicketEntity(ticket);
        entity.setBasicEntity(emp);
        entity.setCustomerEntity(customer);
        entity.setStatus("OPEN");

        repo.save(entity);
    }

    return ResponseEntity.ok("Support assigned successfully");
}


    public List<Long> getSupportAsign(
        Long ticketId,
        Long customerId
) {

    TicketEntity ticket =
        ticketRepo.findById(ticketId)
        .orElseThrow(() -> new RuntimeException("Ticket not found"));

    // 🔒 Ownership check
    if (!ticket.getCustomer().getId().equals(customerId)) {
        throw new RuntimeException("Ticket does not belong to this customer");
    }

    List<Long> empIds = new ArrayList<>();

    for (SupportAsingEntity entity : ticket.getAsignTicketList()) {

       
        Long id=entity.getBasicEntity().getId();
       

        empIds.add(id);
    }

    return empIds;
}
}
