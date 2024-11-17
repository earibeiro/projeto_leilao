package com.leilao.backend.model;

import lombok.Data;

@Data
public class PersonRecoveryDTO {
    String email;
    String password;
    int validationCode;

    public PersonRecoveryDTO(String email, String password, int validationCode) {
        this.email = email;
        this.password = password;
        this.validationCode = validationCode;
    }
}
