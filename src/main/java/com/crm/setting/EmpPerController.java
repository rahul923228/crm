package com.crm.setting;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EmpPerController {

EmpPerRepo repo;

public EmpPerController(EmpPerRepo repo){
    this.repo=repo;
}


@PostMapping("/permition/save/{empId}")
public ResponseEntity<EmpPerEntity> addPermittion(@RequestBody EmpPerModal req,@PathVariable Long empId){
    

    EmpPerEntity p=repo.findByEmpId(empId).orElse(new EmpPerEntity());

    p.setEmpId(empId);
       
        p.setLayout(req.layout);

        p.setViewTickets(req.viewTickets);
        p.setReplyTickets(req.replyTickets);
        p.setCloseTickets(req.closeTickets);

        p.setViewProjects(req.viewProjects);
        p.setAddTasks(req.addTasks);

        p.setViewCustomers(req.viewCustomers);

       

       return ResponseEntity.ok( repo.save(p));

}

@GetMapping("per/get/{empId}")
public ResponseEntity<EmpPerEntity> getPermition(@PathVariable Long empId){

    EmpPerEntity entity=repo.findByEmpId(empId).orElseThrow(()-> new RuntimeException("emp not found"));

    
    return ResponseEntity.ok(entity);
  
    
}
    
}
