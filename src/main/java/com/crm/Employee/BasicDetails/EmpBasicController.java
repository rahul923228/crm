package com.crm.Employee.BasicDetails;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.Employee.AddEmployeeService;

@RestController
@RequestMapping("/api/emp")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpBasicController {
    
    EmpBasicService service;
    AddEmployeeService empService;

    public EmpBasicController(EmpBasicService service) {
        this.service = service;
    }

//     @PostMapping("/addEmployee")
// public ResponseEntity<?> addEmployee(@RequestBody EmployeeCreateRequest request) {
//     empService.addEmployee(request);
//     return ResponseEntity.ok("Employee added successfully");
// }

    @PostMapping("/addBasic/{id}")
    public ResponseEntity<?> addEmpBasic(@RequestBody EmpBasicModal modal,@PathVariable Long id){

        return service.addBasicEmp(modal, id);
    }


    @GetMapping("/getBasic")
    public List<EmpBasicModal>getAll(){
        
        return service.getBasicEmp();
    }


    @PutMapping("/updateBasic/{id}")
    public ResponseEntity<?>updateEmpBasic(@RequestBody EmpBasicModal modal,@PathVariable Long id){

        return ResponseEntity.ok(service.updateEmpBasic(modal, id));

    }


    @DeleteMapping("deleteBasic/{id}")
    public ResponseEntity<?>deleteBasic(@PathVariable Long id){

        return ResponseEntity.ok(service.deleteEmpBasic(id));
    }
}
