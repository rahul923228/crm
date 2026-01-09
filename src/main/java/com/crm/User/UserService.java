package com.crm.User;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.crm.Employee.BasicDetails.EmpBasicRepo;
import com.crm.customer.CustomerRepo;
import com.crm.unit.UnitRepo;

@Service
public class UserService {

    UserRepo userRepo;
    EmpBasicRepo basicRepo;
    JwtiUtil jwtiUtil;
    PasswordEncoder encoder;
    UnitRepo unitRepo;
    PasswordRepo passwordRepo;
    CustomerRepo customerRepo;

    public UserService(PasswordEncoder encoder, JwtiUtil jwtiUtil, UserRepo userRepo, EmpBasicRepo basicRepo,
            UnitRepo unitRepo, PasswordRepo passwordRepo, CustomerRepo customerRepo) {
        this.encoder = encoder;
        this.jwtiUtil = jwtiUtil;
        this.userRepo = userRepo;
        this.basicRepo = basicRepo;
        this.unitRepo = unitRepo;
        this.passwordRepo = passwordRepo;
        this.customerRepo = customerRepo;
    }

    public UserResponce login(UserRequest userRequest) {

       UserEntity user = userRepo
            .findByUserName(userRequest.getUserName())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!encoder.matches(userRequest.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    String token = jwtiUtil.genrateToken(user.getUserName());

    UserResponce response = new UserResponce();
    response.setToken(token);
    response.setRole(user.getRole());
    response.setUserName(user.getUserName());
    response.setUserId(user.getId());   // userId ✅

    // 🔑 ROLE BASED ID EXTRACTION
    if ("CUSTOMER".equals(user.getRole())) {
        Long customerId = customerRepo
                .findByUserEntity_Id(user.getId())
                .orElseThrow(() -> new RuntimeException("Customer not found"))
                .getId();

        response.setCustomerId(customerId); // 🔥 THIS LINE WAS MISSING
    }

    if ("EMPLOYEE".equals(user.getRole())) {
        Long empId = basicRepo.findByUser_Id(user.getId())
                
                .orElseThrow(() -> new RuntimeException("employee not found"))
                .getId();

        response.setEmpId(empId); // 🔥 THIS LINE WAS MISSING
    }

    return response;
    }

    public UserResponce register(UserRequest request) {

        if (userRepo.existsByUserName(request.getUserName().trim())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username already exists");
        }

        UserEntity user = new UserEntity();
        PasswordEntity password = new PasswordEntity();

        String username = request.getUserName().trim().toLowerCase();
        user.setUserName(username);
        user.setPassword(encoder.encode(request.getPassword()));

        password.setUserName(username);
        password.setPassword(request.getPassword());

        passwordRepo.save(password);

        user.setRole(request.getRole()); // e.g. ADMIN / USER

        userRepo.save(user);
        String token = jwtiUtil.genrateToken(user.getUserName());
         UserResponce response = new UserResponce();
    response.setToken(token);
    response.setRole(user.getRole());
    response.setUserName(user.getUserName());
    response.setUserId(user.getId()); 

        return  response;

    }

    // String token=jwtiUtil.genrateToken(user.getUserName());
    // return new UserResponce(token, user.getRole(),
    // user.getUserName(),user.getId(),null);
}
