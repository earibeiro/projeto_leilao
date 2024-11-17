package com.leilao.backend.service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
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
        Optional<Person> person = personRepository.findByEmail(email);
        if(person!=null) {
            Person personDatabase = person.get();
            personDatabase.setValidationCode(genValidationCode());
            personDatabase.setValidationCodeValidity(LocalDateTime.now().plusMinutes(5));
            personRepository.save(personDatabase);
            Context context = new Context();
            context.setVariable("name", personDatabase.getName());
            context.setVariable("code", personDatabase.getValidationCode());
            try {
                emailService.sendTemplateEmail(
                    personDatabase.getEmail(), 
                    "Código de Recuperação de Senha", context, 
                    "email");
            } catch (MessagingException e) {
                e.printStackTrace();
            } 
        }
        return "Email enviado com sucesso";
    }

    public String passwordRecovery(PersonRecoveryDTO personRecoveryDTO) {
        Optional<Person> person = personRepository.findByEmail(personRecoveryDTO.getEmail());
        if(person != null ) {
            if (person.get().getValidationCode() != personRecoveryDTO.getValidationCode()) {
                if (person.get().getValidationCodeValidity().isBefore(LocalDateTime.now())) {
                    return "Código expirado";
                }
                Person personSaved = person.get();
                personSaved.setPassword(personRecoveryDTO.getPassword());
                personSaved.setValidationCode(null);
                personSaved.setValidationCodeValidity(null);
                personRepository.save(personSaved);
                return "Senha alterada com sucesso";
            }
            return "Código inválido";
        }
        return "Pessoa não encontrada";
    }

    public String emailValidate(PersonEmailValidateDTO personEmailValidateDTO) {
        Optional<Person> person = personRepository.findByEmail(personEmailValidateDTO.getEmail());
        if(person != null) {
            if(person.get().getValidationCode() == personEmailValidateDTO.getCode()) {
                Person personSaved = person.get();
                personSaved.setEnabled(true);
                personSaved.setValidationCode(null);
                personRepository.save(personSaved);
                return "Email validado com sucesso";
            }
            return "Código inválido";
        }
        return "Email não validado";
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
