package com.leilao.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PersonAuthResponseDTO {

    private String email;
    private String token;
    
}
