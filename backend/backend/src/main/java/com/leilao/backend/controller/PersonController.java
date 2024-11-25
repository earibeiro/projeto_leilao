package com.leilao.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.PersonAuthRequestDTO;
import com.leilao.backend.model.PersonAuthResponseDTO;
import com.leilao.backend.model.PersonRecoveryDTO;
import com.leilao.backend.repository.PersonRepository;
import com.leilao.backend.security.JwtService;
import com.leilao.backend.service.PersonService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/person")
@CrossOrigin
public class PersonController {
    
    @Autowired
    private PersonService personService;

    @Autowired
    private PersonRepository personRepository;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public PersonAuthResponseDTO authenticateUser(@RequestBody PersonAuthRequestDTO authRequest) {
        Optional<Person> person = personRepository.findByEmail(authRequest.getEmail());
        if (!person.get().isEnabled()) {
            throw new RuntimeException("Email not validated");
        }
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(), authRequest.getPassword()));
            return new PersonAuthResponseDTO(
                authRequest.getEmail(), jwtService.generateToken(authentication.getName()));
    }

    @PostMapping("/passwordCodeRequest")
    public String passwordCodeRequest(@RequestBody PersonRecoveryDTO personRecoveryDTO) {
        return personService.passwordCodeRequest(personRecoveryDTO.getEmail());
    }

    @PostMapping("/passwordRecovery")
    public String passwordRecovery(@RequestBody PersonRecoveryDTO personRecoveryDTO) {
        return personService.passwordRecovery(personRecoveryDTO);
    }

    @PostMapping("/emailValidate")
    public String emailValidate(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        return personService.emailValidate(Integer.parseInt(code));
    }

    @PostMapping
    public Person create(@RequestBody Person person) {
        return personService.create(person);
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person) {
        return personService.create(person);
    }
}
