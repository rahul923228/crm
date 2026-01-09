package com.crm.Employee;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crm.Employee.BasicDetails.EmpBasicEntity;
import com.crm.Employee.BasicDetails.EmpBasicModal;
import com.crm.Employee.BasicDetails.EmpBasicRepo;
import com.crm.Employee.FaimlyDetails.EmpFamilyEntity;
import com.crm.Employee.FaimlyDetails.EmpFamilyModal;
import com.crm.Employee.FaimlyDetails.EmpFamilyRepo;
import com.crm.Employee.WorkDetails.EmpWorkEntity;
import com.crm.Employee.WorkDetails.EmpWorkModal;
import com.crm.Employee.WorkDetails.EmpWorkRepo;
import com.crm.User.UserEntity;
import com.crm.User.UserRepo;
import com.crm.department.DepartMentEntity;
import com.crm.department.DepartmentRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AddEmployeeService {

    EmpBasicRepo basicRepo;
    EmpWorkRepo  workRepo;
    EmpFamilyRepo familyRepo;
    DepartmentRepo departmentRepo;
    UserRepo userRepo;

    public AddEmployeeService(EmpBasicRepo basicRepo, EmpFamilyRepo familyRepo, EmpWorkRepo workRepo,DepartmentRepo departmentRepo,UserRepo userRepo) {
        this.basicRepo = basicRepo;
        this.familyRepo = familyRepo;
        this.workRepo = workRepo;
        this.departmentRepo=departmentRepo;
        this.userRepo=userRepo;
    }


   public List<EmployeeCreateRequest> getEmployee() {

    List<EmployeeCreateRequest> allList = new ArrayList<>();

    List<EmpBasicEntity> basicList = basicRepo.findAll();

    for (EmpBasicEntity basic : basicList) {

        EmployeeCreateRequest dto = new EmployeeCreateRequest();

        // BASIC
        EmpBasicModal basicModal = new EmpBasicModal();
        BeanUtils.copyProperties(basic, basicModal);
        dto.setBasic(basicModal);

        // FAMILY
        EmpFamilyEntity family = familyRepo.findByBasic_Id(basic.getId());
        if (family != null) {
            EmpFamilyModal familyModal = new EmpFamilyModal();
            BeanUtils.copyProperties(family, familyModal);
            familyModal.setBasicId(basic.getId());
            dto.setFamily(familyModal);
        }

        // WORK
        EmpWorkEntity work = workRepo.findByBasic_Id(basic.getId());
        if (work != null) {
            EmpWorkModal workModal = new EmpWorkModal();
            BeanUtils.copyProperties(work, workModal);
            List<DepartMentEntity> dList=work.getDepartmentList();

            dList.stream().forEach(dEntity->{

                 workModal.setDepartmentName(dEntity.getDepartmentName());
            workModal.setBasicId(basic.getId());
            // workModal.setDepartment(work.getDepartmentName());
            dto.setWork(workModal);

            });

           
            
        }

        allList.add(dto);
    }

    return allList;
}


    public EmployeeCreateRequest getEmployeeById(Long id) {

       UserEntity userEntity=userRepo.findById(id).orElseThrow(() -> new RuntimeException("user not found"));

    EmpBasicEntity basicEntity =basicRepo.findByUser_Id(userEntity.getId()).orElseThrow(() -> new RuntimeException("basic not found"));
            

                   



    EmpFamilyEntity familyEntity = familyRepo.findByBasic_Id(id);
    EmpWorkEntity workEntity = workRepo.findByBasic_Id(id);

    
    EmployeeCreateRequest dto = new EmployeeCreateRequest();

  //  UserEntity userEntity=userRepo.findByUserName(basicEntity.getUserName()).get();
    EmpBasicModal basicModal = new EmpBasicModal();
    BeanUtils.copyProperties(basicEntity, basicModal);
    basicModal.setUserId(basicEntity.getUser().getId());
    dto.setBasic(basicModal);

    if (familyEntity != null) {
        EmpFamilyModal familyModal = new EmpFamilyModal();
        BeanUtils.copyProperties(familyEntity, familyModal);
        familyModal.setBasicId(id);
        dto.setFamily(familyModal);
    }

    if (workEntity != null) {
        EmpWorkModal workModal = new EmpWorkModal();
       // DepartMentEntity entity=departmentRepo.findByName(workModal.getDepartment()).orElseThrow(() -> new RuntimeException("not found"));
        
        BeanUtils.copyProperties(workEntity, workModal,"department");
                DepartMentEntity dEntity=new DepartMentEntity();
                dEntity.setDepartmentName(workModal.getDepartmentName());
                dEntity.setWorkEntity(workEntity);
                
        

       // workEntity.setDepartmentName(dEntity);
        workModal.setBasicId(id);

        dto.setWork(workModal);
    }

    
    return dto;
}


    
    public String addEmployee(EmployeeCreateRequest dto,Long id) {

        if (dto.getBasic() == null)
            throw new RuntimeException("Basic details missing");

        if (dto.getFamily() == null)
            throw new RuntimeException("Family details missing");

        if (dto.getWork() == null)
            throw new RuntimeException("Work details missing");


            
     UserEntity userEntity=userRepo.findById(id).orElseThrow(() -> new RuntimeException("user Not found"));
        // BASIC
        EmpBasicEntity basic = new EmpBasicEntity();
        BeanUtils.copyProperties(dto.getBasic(), basic,"user");
        basic.setEmployee_status("Active");

        basic.setUser(userEntity);
        basicRepo.save(basic);

        // FAMILY
        EmpFamilyEntity family = new EmpFamilyEntity();
        BeanUtils.copyProperties(dto.getFamily(), family);
        family.setBasic(basic);
        familyRepo.save(family);

        // WORK
       EmpWorkEntity work = new EmpWorkEntity();
     //  DepartMentEntity dEntity=new DepartMentEntity();
       // DepartMentEntity entity=departmentRepo.findById(work.getId()).orElseThrow(() -> new RuntimeException("deaaprtment not found"));
       
       DepartMentEntity entity=new DepartMentEntity();
       
       work.setBasic(basic);
       work.setDepartmentName(dto.getWork().getDepartmentName());
       work.setDesignation(dto.getWork().getDesignation());
       work.setEmployment_type(dto.getWork().getEmployment_type());

       work.setReporting_manager(dto.getWork().getReporting_manager());
       work.setShift_timing(dto.getWork().getShift_timing());
       work.setWork_location(dto.getWork().getWork_location());
       work.setWork_mode(dto.getWork().getWork_mode());
       
       

        entity.setDepartmentName(dto.getWork().getDepartmentName());
        entity.setWorkEntity(work);
       departmentRepo.save(entity);
                             
       
       workRepo.save(work);

        return "Employee added successfully";
    }

    public ResponseEntity<?> updateEmployee(EmployeeCreateRequest request, Long id) {

    EmpBasicEntity basicEntity =
            basicRepo.findByUser_Id(id)
                     .orElseThrow(() -> new RuntimeException("Employee not found"));

                    
        
    // BASIC UPDATE
    BeanUtils.copyProperties(request.getBasic(), basicEntity, "id","user");
    basicRepo.save(basicEntity);

    // FAMILY UPDATE
    EmpFamilyEntity familyEntity = familyRepo.findByBasic_Id(basicEntity.getId());
    if (familyEntity == null) {
        familyEntity = new EmpFamilyEntity();
        familyEntity.setBasic(basicEntity);
    }
    BeanUtils.copyProperties(request.getFamily(), familyEntity, "id", "basic");
    familyRepo.save(familyEntity);

    // WORK UPDATE
    EmpWorkEntity workEntity = workRepo.findByBasic_Id(id);
   
    if (workEntity == null) {
        workEntity = new EmpWorkEntity();

        workEntity.setBasic(basicEntity);
    }

  

   //  DepartMentEntity dEntity=request.getWork().getDepartment();
//DepartMentEntity dEntity=departmentRepo.findByDepartment(workEntity.getDepartmentName().getDepartment()).orElseThrow(() -> new RuntimeException("not found");
        
    BeanUtils.copyProperties(request.getWork(), workEntity, "id", "basic","department");
    // workEntity.setDepartmentName(dEntity);
    // request.getWork().setDepartment(dEntity.getDepartmentName());
    workRepo.save(workEntity);
    
    return ResponseEntity.ok("Employee updated successfully");
}


public ResponseEntity<?> deleteEmployee(EmpBasicModal modal,Long id){

    EmpBasicEntity basicEntity=basicRepo.findById(id).orElseThrow(() -> new RuntimeException("employee not found"));

   basicEntity.setEmployee_status(modal.getEmployee_status());

   basicRepo.save(basicEntity);
    return ResponseEntity.ok("employee inactive");
}

}
