package com.crm.Employee.docomentAndPhoto;

import com.crm.Employee.BasicDetails.EmpBasicEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="docoment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpDocomentEntity {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

     @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte [] photo;

    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte [] docoment;

   private String docomentType;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id",nullable=false,unique=true)
    EmpBasicEntity basic;


}
