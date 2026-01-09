package com.crm.customerQuery.query;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QueryController {

    QueryService service;

    public QueryController(QueryService service) {
        this.service = service;
    }


    @PostMapping("/addQuery/{customerId}")
    public ResponseEntity<?> addQuery(@RequestBody QueryModal modal, @PathVariable Long customerId){
        return service.addQuery(modal, customerId);
    }

    @GetMapping("/getQuery/{customerId}")
    public List<QueryModal>findQuery(@PathVariable Long customerId){

        return service.findQuery(customerId);
    }

    @PutMapping("/updateQuery/{customerId}")
     public ResponseEntity<?> updateQuery(@RequestBody QueryModal modal,@PathVariable Long customerId){


        return service.updateQuery(modal, customerId);

     }



    
    
}
