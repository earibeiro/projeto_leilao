package com.leilao.backend.model;

import lombok.Data;

@Data
public class PersonEmailValidateDTO {
    private String email;
    private int code;

    public PersonEmailValidateDTO(String email, int code) {
        this.email = email;
        this.code = code;
    }
}
