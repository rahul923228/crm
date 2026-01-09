package com.crm.unit;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class UnitController {
    

    UnitService service;

    public UnitController(UnitService service) {
        this.service = service;
    }


    @PostMapping("/addUnit/{userId}")
    public ResponseEntity<?> addUnit(@RequestBody UnitModal modal,@PathVariable Long userId){

        return service.addUnit(modal, userId);
    }

    @GetMapping("/getUnit/{userid}")
    public List<UnitModal>getUnit(@PathVariable Long userId){

        return service.getUnit(userId);


    }
    
}
