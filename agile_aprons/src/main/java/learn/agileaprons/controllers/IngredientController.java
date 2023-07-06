package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.IngredientService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.models.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ingredient")
public class IngredientController {
    @Autowired
    private IngredientService service;

    @GetMapping
    public List<Ingredient> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> findById(@PathVariable int id) {
        Ingredient ingredient = service.findById(id);
        if (ingredient != null) {
            return new ResponseEntity<>(ingredient, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get/{name}")
    public Ingredient findByName(@PathVariable String param) {
        return service.findAll().stream()
                .filter(ingredient -> ingredient.getName().equalsIgnoreCase(param))
                .findFirst()
                .orElse(null);
    }

    @GetMapping("/search/{param}")
    public List<Ingredient> searchByName(@PathVariable String param) {
        return service.findAll().stream()
                .filter(ingredient -> ingredient.getName().toLowerCase().contains(param.toLowerCase()))
                .collect(Collectors.toList());
    }

    @PostMapping("/add/get/")
    public List<Ingredient> addAndGetIngredients(@RequestBody List<Ingredient> ingredients) {
        List<Ingredient> returnIngredients = new ArrayList<>();
        return returnIngredients;
    }


    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid Ingredient ingredient, BindingResult bindingResult) throws DataException {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<Ingredient> result = service.create(ingredient);
        if (result.isSuccess()) {
            return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
    }

}
