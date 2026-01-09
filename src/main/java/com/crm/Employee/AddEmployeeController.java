package com.crm.Employee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.Employee.BasicDetails.EmpBasicModal;

@RestController
@RequestMapping("api/emp")
@CrossOrigin(origins = "http://localhost:3000")
public class AddEmployeeController {

    AddEmployeeService service;

    public AddEmployeeController(AddEmployeeService service) {
        this.service = service;
    }

    @PostMapping("/addEmployee/{id}")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeCreateRequest request,@PathVariable Long id) {

        service.addEmployee(request,id);
        return ResponseEntity.ok("Employee added successfully");
    }

    @GetMapping("/all")
    public List<EmployeeCreateRequest> getEmployee() {

        return service.getEmployee();

    }

    @GetMapping("/all/{id}")
    public EmployeeCreateRequest getEmployee(@PathVariable Long id) {

        return service.getEmployeeById(id);

    }


  @PutMapping("/update/{id}")
public ResponseEntity<?> updateEmployee(
        @RequestBody EmployeeCreateRequest request,
        @PathVariable Long id) {

    service.updateEmployee(request, id);
    return ResponseEntity.ok("Employee updated successfully");
}


    // public ResponseEntity<?> updateEmployye(@RequestBody )


    @PutMapping("delete/{id}")
    public ResponseEntity<?> deleteEmployee(@RequestBody EmpBasicModal request,@PathVariable Long id){

    
        return service.deleteEmployee(request, id);
    }

}
