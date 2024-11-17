package com.leilao.backend.model;

import lombok.Data;

@Data
public class PersonRecoveryDTO {
    String email;
    String password;
    int code;

    public PersonRecoveryDTO(String email, String password, int code) {
        this.email = email;
        this.password = password;
        this.code = code;
    }
}
