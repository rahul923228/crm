package com.crm.customerQuery;

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
public class NewCustomerController {
    
    NewCustomerService service;

    public NewCustomerController(NewCustomerService service) {
        this.service = service;
    }


    @PostMapping("/addNewCustomer")
    public ResponseEntity<?> addNewCustomer(@RequestBody NewCustomerModal modal){
        
        return service.addNewCustomer(modal);
    }

    @GetMapping("/getNewCustomer")
     public List<NewCustomerModal> findAll(){
        return service.findAll();
     }

     @PutMapping("newCustomer/updateStatus/{customerId}")
     public ResponseEntity<?> updateStatus(@PathVariable Long customerId, @RequestParam String status){

        return service.updateStatus(customerId,status);

    }
}