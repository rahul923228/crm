package com.crm.Employee.WorkDetails;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.Employee.BasicDetails.EmpBasicRepo;
import com.crm.department.DepartMentEntity;

@Service
public class EmpWorkService {
    
    EmpWorkRepo repo;
    EmpBasicRepo basicRepo;

    public EmpWorkService(EmpWorkRepo repo,EmpBasicRepo basicRepo) {
        this.repo = repo;
        this.basicRepo=basicRepo;
    }


    public ResponseEntity<?> addWork(EmpWorkModal modal){

        EmpBasicEntity basic=basicRepo.findById(modal.getBasicId()).orElseThrow(() ->new RuntimeException("not found"));
      
        EmpWorkEntity entity=new EmpWorkEntity();

        DepartMentEntity dEntity=new DepartMentEntity();


        BeanUtils.copyProperties(modal, entity);
        dEntity.setDepartmentName(modal.getDepartmentName());
     
        entity.setBasic(basic);

        

        return ResponseEntity.ok(repo.save(entity));

        
    }


    public List<EmpWorkModal> getWork(){


        List<EmpWorkEntity> list=repo.findAll();

        List<EmpWorkModal> modals=new ArrayList<>();

        for (EmpWorkEntity entity : list) {
            
            EmpWorkModal modal=new EmpWorkModal();

            BeanUtils.copyProperties(entity, modal);

            modals.add(modal);
        }

        return modals;
        
    }


    public ResponseEntity<?> updateWork(EmpWorkModal modal,Long id){


        EmpWorkEntity entity=repo.findById(id).orElseThrow(() -> new RuntimeException("Work Deatils not found"));

        EmpBasicEntity basic=basicRepo.findById(modal.getBasicId()).orElseThrow(() ->new RuntimeException("not found"));

        entity.setBasic(basic);

        BeanUtils.copyProperties(modal,entity);

        repo.save(entity);

        return ResponseEntity.ok("updated success");
    }


    public ResponseEntity<?> deleteWork(Long id){

        repo.deleteById(id);

       return  ResponseEntity.ok("deleted success");
    }
}
