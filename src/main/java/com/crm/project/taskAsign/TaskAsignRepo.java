package com.crm.project.taskAsign;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.project.task.TaskEntity;

@Repository
public interface TaskAsignRepo extends JpaRepository<TaskAsignEntity, Long>{

    public boolean existsByTaskEntityAndBasicEntity(TaskEntity task, EmpBasicEntity employee);
    
}
