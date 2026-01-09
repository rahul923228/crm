package com.crm.Employee.WorkDetails;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emp")
public class EmpWorkController {

    EmpWorkService service;

    public EmpWorkController(EmpWorkService service) {
        this.service = service;
    }


    
    // @PostMapping("/addWork")
    // public ResponseEntity<?> addWork(@RequestBody EmpWorkModal modal){

    //     return ResponseEntity.ok(service.addWork(modal));
    // }

    @GetMapping("/getWork")
    public List<EmpWorkModal> getWork(){

        return service.getWork();
    }

    @PostMapping("/updateWork")
    public ResponseEntity<?> updateWork(@RequestBody EmpWorkModal modal, @PathVariable Long id){

        return service.updateWork(modal, id);
    }

    @DeleteMapping("/deleteWork")
    public ResponseEntity<?> deleteWork(@PathVariable Long id){

        return ResponseEntity.ok(service.deleteWork(id));
    }
}
