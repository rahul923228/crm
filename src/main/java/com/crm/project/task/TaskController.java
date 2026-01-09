package com.crm.project.task;

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

public class TaskController {

    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }



    @PostMapping("/addTask/{customerId}")
    public ResponseEntity<?> addTask(@RequestBody TaskModal taskModal,@PathVariable Long customerId){

        return taskService.addTask(taskModal,customerId);
    }

    // @GetMapping("/getTask/{userId}")
    // public List<TaskModal> getTaskByUserId(@PathVariable Long userId){

    //     return taskService.getATasksByUserId(userId);
    // }


    @GetMapping("/getTask/{customerId}")
    public List<TaskModal>getTaskCustomerId(@PathVariable Long customerId){

        return taskService.getTaskCustomerId(customerId);
    }


    @GetMapping("/getAllTask")
    public List<TaskModal> getAll(){
        
        return taskService.getAllTask();
    }


    @PutMapping("task/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,@RequestParam String status){

        return taskService.updateTask(id, status);
    }
    

}
