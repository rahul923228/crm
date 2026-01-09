package  com.crm.customer;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public  class CustomerController{


    CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }


    @PostMapping("/addCustomer/{id}")
    public ResponseEntity<?> addCustomer(@RequestBody CustomerModal modal,@PathVariable Long id){

        return  service.addCustomer(modal,id);
    }


    @GetMapping("/getCustomer/{id}")
    public List<CustomerModal> getCustomerById(@PathVariable Long id){
        
        return service.getCustomerById(id);
    }

    @GetMapping("/allCustomer")
    public List<CustomerModal> getAllCustomer(){

        return service.getAllCustomer();
    }

}