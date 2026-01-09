package com.crm.customerSupport;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TicketController {
    
    TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }


    @PostMapping("/addTicket/{customerId}/{projectId}")
    public ResponseEntity<?> addTicket(@RequestBody TicketModal modal,@PathVariable Long customerId,@PathVariable Long projectId) throws IOException{

        return service.addTicket(modal, customerId, projectId);
    }


    @GetMapping("/getTicket/{customerId}")
    public List<TicketModal> getTicketByCustomerId(@PathVariable Long customerId){


        return service.getTicketByCustomerId(customerId);
        
    }

    @GetMapping("/allTicket")
    public List<TicketModal>getAll(){

        return service.getAll();
    }

    @PutMapping("update/{ticketId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long ticketId,@RequestParam String status){

        return service.updateStatus(ticketId, status);

}

}
