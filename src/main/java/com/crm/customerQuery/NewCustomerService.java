package com.crm.customerQuery;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class NewCustomerService {
    

    NewCustomerRepo repo;

    public NewCustomerService(NewCustomerRepo repo) {
        this.repo = repo;
    }



    public ResponseEntity<?> addNewCustomer(NewCustomerModal modal){

        NewCustomerEntity entity=new NewCustomerEntity();

        BeanUtils.copyProperties(modal, entity);
        entity.setStatus("Active");

        return ResponseEntity.ok(repo.save(entity));
    }


    public List<NewCustomerModal> findAll(){

        List<NewCustomerEntity> list=repo.findAll();

        List<NewCustomerModal> modals=new ArrayList<>();

        list.stream().forEach(entity->{

            NewCustomerModal modal=new NewCustomerModal();
            BeanUtils.copyProperties(entity, modal);
            modals.add(modal);


        });
        return modals;
    }


    public ResponseEntity<?> updateStatus(Long customerId,String status){

        NewCustomerEntity entity= repo.findById(customerId).orElseThrow(() -> new RuntimeException("new customer not found"));


        entity.setStatus(status);

        repo.save(entity);

        return ResponseEntity.ok("status updated");

    }

}
