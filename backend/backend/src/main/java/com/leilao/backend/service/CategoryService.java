package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Category;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public Category create(Category category, Person person) {
        category.setPerson(person);
        System.out.println(category.getName() + " " + category.getObservation());
        System.out.print(person.getName());
        return categoryRepository.save(category);
    }

    public Category update(Category category) {
        Category categorySaved = categoryRepository.findById(category.getId()).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        categorySaved.setName(category.getName());
        categorySaved.setObservation(category.getObservation());
        return categoryRepository.save(categorySaved);
    }

    public void delete(Long id) {
        Category categorySaved = categoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        categoryRepository.delete(categorySaved);
    }

    public List<Category> listAll() {
        return categoryRepository.findAll();
    }
}
