package com.ssafy.onu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "\"function\"")
public class Function {
    @Id
    private int functionId;
    @Column
    private String functionName;
}
