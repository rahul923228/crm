package com.crm.project.taskAsign;

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
public class TaskAsignController {
    
TaskAsignService service;

public TaskAsignController(TaskAsignService service) {
    this.service = service;
}



@PutMapping("/task/{taskId}")
public ResponseEntity<?> asigTask(@PathVariable Long taskId,@RequestBody List<Long> emp_id){

    service.assignTaskToEmployees(taskId, emp_id);

    return ResponseEntity.ok("asing success");
}

@GetMapping("getAsignTask/{taskId}")
public List<TaskAsignModal> getAsignTask(@PathVariable Long taskId){

    return service.getAsignTask(taskId);
}



}