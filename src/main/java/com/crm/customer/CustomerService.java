package com.crm.customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.User.UserEntity;
import com.crm.User.UserRepo;

@Service
public class CustomerService {
    
    
    CustomerRepo customerRepo;
    UserRepo userRepo;

    public CustomerService(CustomerRepo customerRepo,UserRepo userRepo) {
        this.customerRepo = customerRepo;
        this.userRepo=userRepo;
    }




    public ResponseEntity<?> addCustomer(CustomerModal modal,Long id){

        UserEntity userEntity=userRepo.findById(id).orElseThrow(() -> new RuntimeException("user not found"));

      

       CustomerEntity entity=new CustomerEntity();
       
       entity.setUserEntity(userEntity);

        BeanUtils.copyProperties(modal, entity,"user");
        customerRepo.save(entity);

       

         return ResponseEntity.ok("saved success");
        
    }


    public List<CustomerModal> getCustomerById(Long id){

        UserEntity userEntity=userRepo.findById(id).orElseThrow(() -> new RuntimeException("user not found"));

        List<CustomerEntity> list=userEntity.getCustomerList();
        List<CustomerModal> modalList=new ArrayList<>();

        list.stream().forEach(entity->{


            CustomerModal modal=new CustomerModal();

            BeanUtils.copyProperties(entity, modal,"user");
            if(entity.getUserEntity().getId()!=null){
                modal.setUser_id(entity.getUserEntity().getId());
            }

            modalList.add(modal);

        });

        return modalList;
    }


    public List<CustomerModal> getAllCustomer(){

    List<CustomerEntity> list=customerRepo.findAll();
    List<CustomerModal> modals=new ArrayList<>();

    list.stream().forEach(entity->{

        CustomerModal modal=new CustomerModal();
        BeanUtils.copyProperties(entity, modal);
        modals.add(modal);

    });

    return modals;

    }
}
