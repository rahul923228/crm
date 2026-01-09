package com.crm.Employee.FaimlyDetails;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emp")
public class EmpFamilyController {
    
    EmpFamilyService service;

    public EmpFamilyController(EmpFamilyService service) {
        this.service = service;
    }


    // @PostMapping("/addFamily")
    // public ResponseEntity<?> addFamily(@RequestBody EmpFamilyModal modal){

    //     return ResponseEntity.ok(service.addFamily(modal));
    // }

    @GetMapping("/getFamily")
    public List<EmpFamilyModal>getFamily(){

        return service.getFamily();
    }

    @PutMapping("/updateFamily/{id}")
    public ResponseEntity<?> updateFamily(@RequestBody EmpFamilyModal modal,@PathVariable Long id){

        return ResponseEntity.ok(service.updateFamily(modal, id));
    }

    public ResponseEntity<?> deleteFamily(@PathVariable Long id){

        return ResponseEntity.ok(service.deleteFamily(id));
    }
}
