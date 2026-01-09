package com.crm.chatSupport.supportAsign;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SupportAsignController {
    
    SupportAsignService service;

    public SupportAsignController(SupportAsignService service) {
        this.service = service;
    }


    @PutMapping("support/{customerId}/{ticketId}")
    public ResponseEntity<?> asingSupport(@PathVariable Long customerId,@PathVariable Long ticketId,@RequestBody List<Long> empId){

        return service.asignTicket(customerId,ticketId, empId);
        
    }

    @GetMapping("/getSupport/{customerId}/{ticketId}")
    public List<SupportAsignModal> getSupportAsign(@PathVariable Long ticketId,@PathVariable Long customerId){

        return service.getSupportA(ticketId, customerId);

    }

}
