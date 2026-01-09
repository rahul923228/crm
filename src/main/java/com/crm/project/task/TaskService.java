package com.crm.project.task;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.User.UserRepo;
import com.crm.customer.CustomerEntity;
import com.crm.customer.CustomerRepo;

@Service
public class TaskService {
    
    TaskRepo taskRepo;
    UserRepo userRepo;
    CustomerRepo customerRepo;

    public TaskService(TaskRepo taskRepo, UserRepo userRepo,CustomerRepo customerRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
        this.customerRepo=customerRepo;
    }

    public ResponseEntity<?> addTask(TaskModal taskModal,Long customerId){

       // UserEntity userEntity=userRepo.findById(userId).orElseThrow(() -> new RuntimeException("user not found"));

        CustomerEntity customerEntity=customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("customer not found"));

     

             TaskEntity taskEntity=new TaskEntity();

        BeanUtils.copyProperties(taskModal, taskEntity,"customer");
        
        taskModal.setCustomer_id(customerEntity.getId());
        
        taskEntity.setStatus("OPEN");
    
        taskEntity.setCustomerEntity(customerEntity);

         return ResponseEntity.ok(taskRepo.save(taskEntity));
        
    }

   

    public List<TaskModal> getTaskCustomerId(Long customerId){


CustomerEntity customerEntity=customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("customer not founde"));



                   List<TaskEntity>taskList=  customerEntity.getTaskList();
                   List<TaskModal> modalList=new ArrayList<>();

                   taskList.stream().forEach(taskEntity ->{

                    TaskModal modal=new TaskModal();

                    BeanUtils.copyProperties(taskEntity, modal,"customer");


            if(taskEntity.getCustomerEntity()!=null){
                modal.setCustomer_id(taskEntity.getCustomerEntity().getId());
            }

                    modalList.add(modal);


                   });

          

                   return modalList;
    }


    public List<TaskModal> getAllTask(){

        List<TaskEntity> taskList=taskRepo.findAll();

        List<TaskModal> taskModals=new ArrayList<>();

        taskList.stream().forEach(entity ->{

            TaskModal modal=new TaskModal();

            BeanUtils.copyProperties(entity, modal,"customer_id");
            modal.setCustomer_id(entity.getCustomerEntity().getId());
            modal.setStatus(entity.getStatus());
            taskModals.add(modal);

        });
        
       return taskModals;
    }


    public ResponseEntity<?> updateTask(Long id,String status){


        TaskEntity entity=taskRepo.findById(id).orElseThrow(()-> new RuntimeException("tasks not found"));


        entity.setStatus(status);

        taskRepo.save(entity);

        return ResponseEntity.ok(entity);

    }



   
}
