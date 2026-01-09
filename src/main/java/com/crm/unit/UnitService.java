package com.crm.unit;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.User.UserEntity;
import com.crm.User.UserRepo;

@Service
public class UnitService {
    
    UnitRepo unitRepo;
    UserRepo userRepo;

    public UnitService(UnitRepo unitRepo,UserRepo userRepo) {
        this.unitRepo = unitRepo;
        this.userRepo=userRepo;
    }


    public ResponseEntity<?> addUnit(UnitModal modal,Long userId){

    
        UserEntity userEntity=userRepo.findById(userId).orElseThrow(() -> new RuntimeException("user not found"));

        UnitEntity entity=new UnitEntity();
       
            
            BeanUtils.copyProperties(modal, entity,"user");
            entity.setUserEntity(userEntity);
             unitRepo.save(entity);

    
        return ResponseEntity.ok("company created suucesss");
    }

    public List<UnitModal> getUnit(Long userId){

        UserEntity userEntity=userRepo.findById(userId).orElseThrow(() -> new RuntimeException("user not  found"));


       List<UnitEntity> unitList= userEntity.getUnitEntity();

        List<UnitModal>  modalList=new ArrayList<>();

        unitList.stream().forEach(entity ->{

            UnitModal modal=new UnitModal();

            BeanUtils.copyProperties(entity, modal);

            modalList.add(modal);


        });


        return modalList;
        
    }

}
