package com.crm.Employee.FaimlyDetails;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.Employee.BasicDetails.EmpBasicRepo;

@Service
public class EmpFamilyService {

    EmpFamilyRepo repo;
    EmpBasicRepo basicRepo;

    public EmpFamilyService(EmpFamilyRepo repo,EmpBasicRepo basicRepo) {
        this.repo = repo;
        this.basicRepo=basicRepo;
    }


    public ResponseEntity<?> addFamily(EmpFamilyModal modal){

        EmpFamilyEntity entity=new EmpFamilyEntity();

        
        EmpBasicEntity basic=basicRepo.findById(modal.getBasicId()).orElseThrow(() -> new RuntimeException("not found"));
        BeanUtils.copyProperties(modal, entity);

        entity.setBasic(basic);

        

        return ResponseEntity.ok(repo.save(entity));
    }

    public List<EmpFamilyModal> getFamily(){

        List<EmpFamilyEntity>list=repo.findAll();

        List<EmpFamilyModal>modals=new ArrayList<>();

        for (EmpFamilyEntity entity : list) {
            
            EmpFamilyModal modal=new EmpFamilyModal();

            BeanUtils.copyProperties(entity, modal);
            modal.setBasicId(entity.getId());
            modals.add(modal);
        }

        return modals;
        
    }


    public ResponseEntity<?> updateFamily(EmpFamilyModal modal,Long id){

        EmpFamilyEntity entity=repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        EmpBasicEntity basic=basicRepo.findById(modal.getBasicId()).orElseThrow(() -> new RuntimeException("not found"));

        BeanUtils.copyProperties(modal, entity,"id");

        entity.setBasic(basic);
        repo.save(entity);

        return ResponseEntity.ok("updated success");

    }


    public ResponseEntity<?> deleteFamily(Long id){

        EmpFamilyEntity entity=repo.findById(id).orElseThrow(() -> new RuntimeException("emp not found"));

        repo.deleteById(entity.getId());

        return ResponseEntity.ok("Deleted success");


    }

    
}
