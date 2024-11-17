package com.leilao.backend.service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.PersonEmailValidateDTO;
import com.leilao.backend.model.PersonRecoveryDTO;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService implements UserDetailsService {
    
    @Autowired
    private PersonRepository personRepository;
    
    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String passwordCodeRequest(String email) {
        Person person = personRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("Pessoa não encontrada"));
        person.setValidationCode(genValidationCode());
        person.setValidationCodeValidity(LocalDateTime.now().plusMinutes(5));
        personRepository.save(person);
        Context context = new Context();
        context.setVariable("code", person.getValidationCode());
        try {
            emailService.sendTemplateEmail(
                person.getEmail(), 
                "Recuperação de Senha", context, 
                "email");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return "Código enviado para o email";
    }
    
    public String passwordRecovery(PersonRecoveryDTO personRecoveryDTO) {
        Person person = personRepository.findByEmail(personRecoveryDTO.getEmail()).orElseThrow(() -> new NoSuchElementException("Pessoa não encontrada"));
        if(person.getValidationCode() == personRecoveryDTO.getCode()) {
            if (person.getValidationCodeValidity().isBefore(LocalDateTime.now())) {
                return "Código expirado";
            } 
            person.setPassword(personRecoveryDTO.getPassword());
            person.setValidationCode(null);
            personRepository.save(person);
            return "Senha alterada com sucesso";
        }
        return "Código inválido";
    }

    public String emailValidate(PersonEmailValidateDTO personEmailValidateDTO) {
        Person person = personRepository.findByEmail(personEmailValidateDTO.getEmail()).orElseThrow(() -> new NoSuchElementException("Pessoa não encontrada"));
            if(person.getValidationCode() == personEmailValidateDTO.getCode()) {
                person.setEnabled(true);
                person.setValidationCode(null);
                personRepository.save(person);
                return "Email validado com sucesso";
            }
            return "Código inválido";
    }

    public Person create(Person person) {
        person.setValidationCode(genValidationCode());
        person.setEnabled(false);
        Person personSaved = personRepository.save(person);
        Context context = new Context();
        context.setVariable("code", personSaved.getValidationCode());
        context.setVariable("name", personSaved.getName());
        try {
            emailService.sendTemplateEmail(
                personSaved.getEmail(), 
                "Cadastro Efetuado com Sucesso", context, 
                "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return personSaved;
    }

    public Person update(Person person) {
        Person personSaved = personRepository.findById(person.getId()).orElseThrow(() -> new NoSuchElementException("Pessoa não encontrada"));
        personSaved.setName(person.getName());
        return personRepository.save(personSaved);
    }

    public int genValidationCode () {
        return 100000 + new Random().nextInt(999999);
    }
    
}
