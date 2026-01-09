package com.crm.Employee.BasicDetails;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.User.UserEntity;
import com.crm.User.UserRepo;

@Service
public class EmpBasicService {

    EmpBasicRepo repo;
    UserRepo userRepo;

    public EmpBasicService(EmpBasicRepo repo,UserRepo userRepo) {
        this.repo = repo;
        this.userRepo=userRepo;
    }

    

    

    
    public  ResponseEntity<?> addBasicEmp(EmpBasicModal modal,Long id){

        EmpBasicEntity entity=new EmpBasicEntity();

        UserEntity userEntity=userRepo.findById(id).orElseThrow(() -> new RuntimeException("user Not found"));

        BeanUtils.copyProperties(modal, entity);
          entity.setUser(userEntity);
        repo.save(entity);

        return ResponseEntity.ok("add success");
    }


    public List<EmpBasicModal>getBasicEmp(){

        
        
        List<EmpBasicEntity> entity=repo.findAll();

       // EmpBasicModal modal=new EmpBasicModal();

       List<EmpBasicModal>modals=new ArrayList<>();

        for (EmpBasicEntity empBasicEntity : entity) {
            
            EmpBasicModal modal=new EmpBasicModal();

            

            BeanUtils.copyProperties(empBasicEntity, modal);

            

           
            

            modals.add(modal);

        }

        return modals;
        
    }

    public ResponseEntity<?>updateEmpBasic( EmpBasicModal modal, Long id){

       EmpBasicEntity entity= repo.findById(id).orElseThrow(() -> new RuntimeException("user not found"));

       

       

       BeanUtils.copyProperties(modal, entity,"id");


       
       return ResponseEntity.ok(repo.save(entity));
    }

    public ResponseEntity<?> deleteEmpBasic(Long id){

        EmpBasicEntity entity=repo.findById(id).orElseThrow(() -> new RuntimeException("user not found"));

        
       repo.deleteById(entity.getId());
        return ResponseEntity.ok("delete success");
    }
}
