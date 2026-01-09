package com.crm.Employee.docomentAndPhoto;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/emp")
public class EmpDocomentController {
    
    EmpDocomentService docomentService;

    public EmpDocomentController(EmpDocomentService docomentService) {
        this.docomentService = docomentService;
    }


    @PostMapping(value="/addDocoment/{id}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public  ResponseEntity<?> addDocoment(@RequestParam(required=false) MultipartFile photo
                                        ,@RequestParam(required=false) MultipartFile docoment
                                        ,@RequestParam(required=false) String docomentType
                                        ,@PathVariable Long id) throws IOException{



                                            return docomentService.addDocoment(photo, docoment, docomentType, id);

        
    }


    @GetMapping("/getPhoto/{id}")
    public List<EmpDocomentModal> getPhotoAndDocoment(@PathVariable Long id){

        return docomentService.findPhotoandDocoment(id);
    }
}
