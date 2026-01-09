package com.crm.customerQuery.query;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.customerQuery.NewCustomerEntity;
import com.crm.customerQuery.NewCustomerRepo;

@Service
public class QueryService {
    
    QueryRepo repo;
    NewCustomerRepo customerRepo;

    public QueryService(NewCustomerRepo customerRepo, QueryRepo repo) {
        this.customerRepo = customerRepo;
        this.repo = repo;
    }

    public ResponseEntity<?> addQuery(QueryModal modal,Long customerId){


        NewCustomerEntity customerEntity=customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("customer not found"));

        QueryEntity entity=new QueryEntity();

        BeanUtils.copyProperties(modal, entity,"customer");

        entity.setNewCustomerEntity(customerEntity);

        repo.save(entity);

        return ResponseEntity.ok("query add success");
        
    }


    public List<QueryModal> findQuery(Long customerId){
       
        NewCustomerEntity customerEntity=customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("customer not found"));


        List<QueryEntity> list=customerEntity.getQueryList();
        List<QueryModal> modals=new ArrayList<>();

        list.stream().forEach(entity->{

            QueryModal modal=new QueryModal();

            BeanUtils.copyProperties(entity, modal);
            modal.setNewCustomer_id(entity.getCustomer_id());

            modals.add(modal);

        });

        return modals;
        
    }


    public ResponseEntity<?> updateQuery(QueryModal modal,Long customerId){

        NewCustomerEntity customerEntity=customerRepo.findById(customerId).orElseThrow(() -> new RuntimeException("customer not found"));

        List<QueryEntity> list=customerEntity.getQueryList();

        list.stream().forEach(entity->{

          //  BeanUtils.copyProperties(modal, entity);

             entity.setCall_date(modal.getCall_date());
             entity.setDeal_status(modal.getDeal_status());
             entity.setDiscussion(modal.getDiscussion());
             entity.setProjectName(modal.getProjectName());
             entity.setNext_followup(modal.getNext_followup());
             entity.setCustomer_id(customerEntity.getId());

            entity.setNewCustomerEntity(customerEntity);
            repo.save(entity);

        });

       

        return ResponseEntity.ok("updated success");
    }


    

    
}
