package com.leilao.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.Category;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;
import com.leilao.backend.service.CategoryService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;


    @Autowired
    private PersonRepository personRepository;

    @PostMapping
    public Category create(@RequestBody Category category, Principal principal) {
        System.out.println(category.getName() + " " + category.getObservation());
        Person person = personRepository.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("Person not found"));
        return categoryService.create(category, person);
    }

    @PutMapping
    public Category update(@RequestBody Category category) {
        return categoryService.update(category);
    }

    @GetMapping
    public List<Category> listAll() {
        return categoryService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        categoryService.delete(id);
    }

    @GetMapping("/find")
    public String find(@PathParam("name") String name, @PathParam("age") Integer age) {
        System.out.println(name + " " + age);
        return name + " " + age; 
    }

}
