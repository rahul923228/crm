package com.crm.Employee.docomentAndPhoto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.Employee.BasicDetails.EmpBasicRepo;

@Service
public class EmpDocomentService {

     EmpBasicRepo basicRepo;

   EmpDocomentRepo docomentRepo;

    public EmpDocomentService(EmpBasicRepo basicRepo, EmpDocomentRepo docomentRepo) {
        this.basicRepo = basicRepo;
        this.docomentRepo = docomentRepo;
    }


    public ResponseEntity<?> addDocoment(MultipartFile photo,MultipartFile docoment,String docomentType,Long id) throws IOException{


        EmpBasicEntity basicEntity=basicRepo.findById(id).orElseThrow(() -> new RuntimeException("basic not found"));

        EmpDocomentEntity docomentEntity=docomentRepo.findByBasic(basicEntity).orElse(new EmpDocomentEntity());


        
        
        docomentEntity.setBasic(basicEntity);

        if(photo!=null){

            docomentEntity.setPhoto(photo.getBytes());
        }


        if(docoment!=null){
            docomentEntity.setDocoment(docoment.getBytes());
            docomentEntity.setDocomentType(docomentType);
        }
        
        
        docomentRepo.save(docomentEntity);

        return ResponseEntity.ok("docoment add success");

    }

    public List<EmpDocomentModal> findPhotoandDocoment(long id){

        EmpBasicEntity basicEntity=basicRepo.findById(id).orElseThrow(() -> new RuntimeException("basic not found"));

       List< EmpDocomentEntity> docomentEntitys=basicEntity.getDocomentEntity();

       List<EmpDocomentModal> list=new ArrayList<>();


         docomentEntitys.stream().forEach(entity -> {


             EmpDocomentModal docomentModal=new EmpDocomentModal();
             docomentModal.setBasicId(entity.getBasic().getId());
            docomentModal.setId(entity.getId());
             docomentModal.setProfile(entity.getPhoto());
             docomentModal.setDocoment(entity.getDocoment());

     //  BeanUtils.copyProperties(entity, docomentModal,"id","basic");

       list.add(docomentModal);

         });

      

       return list;

    }


    
}
