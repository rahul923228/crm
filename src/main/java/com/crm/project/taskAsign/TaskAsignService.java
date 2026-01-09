package com.crm.project.taskAsign;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.Employee.BasicDetails.EmpBasicRepo;
import com.crm.project.task.TaskEntity;
import com.crm.project.task.TaskRepo;

import jakarta.transaction.Transactional;

@Service
public class TaskAsignService {

    private final TaskAsignRepo asignRepo;
    private final EmpBasicRepo basicRepo;
    private final TaskRepo taskRepo;

    public TaskAsignService(TaskAsignRepo asignRepo,
                            EmpBasicRepo basicRepo,
                            TaskRepo taskRepo) {
        this.asignRepo = asignRepo;
        this.basicRepo = basicRepo;
        this.taskRepo = taskRepo;
    }

    @Transactional
    public void assignTaskToEmployees(Long taskId, List<Long> empIds) {

        TaskEntity task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        for (Long empId : empIds) {

            EmpBasicEntity employee = basicRepo.findById(empId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            boolean exists =
                    asignRepo.existsByTaskEntityAndBasicEntity(task, employee);

            if (exists) continue;

            TaskAsignEntity asign = new TaskAsignEntity();
            asign.setTaskEntity(task);
            asign.setBasicEntity(employee);
            asign.setCustomerEntity(task.getCustomerEntity());
            asign.setStatus("Open");

            asignRepo.save(asign);
        }
    }


    public List<TaskAsignModal> getAsignTask(Long taskId){

              TaskEntity taskEntity=taskRepo.findById(taskId).orElseThrow(()-> new RuntimeException("task not found"));

              List<TaskAsignEntity> list=taskEntity.getTaskAsignList();
              List<TaskAsignModal> modals=new ArrayList<>();

              list.stream().forEach(entity->{

                TaskAsignModal  modal =new TaskAsignModal();

                modal.setId(entity.getId());
                modal.setEmp_id(entity.getBasicEntity().getId());
                modal.setTask_id(entity.getTaskEntity().getId());
                modal.setStatus(entity.getStatus());
                modal.setAssignedDate(entity.getAssignedDate());

                modals.add(modal);

              });

              return modals;



    }
}
