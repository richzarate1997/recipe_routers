package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.IngredientService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.models.Ingredient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/ingredient")
public class IngredientController {
    private final IngredientService service;


    public IngredientController(IngredientService service) {
        this.service = service;
    }

    @GetMapping
    public List<Ingredient> findAll(){ return  service.findAll();}

    @GetMapping("/{id}")
    public Ingredient findById(@PathVariable int id) {return service.findById(id);}

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid Ingredient ingredient, BindingResult bindingResult) throws DataException {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(err -> err.getDefaultMessage())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result result = service.create(ingredient);
        if (result.isSuccess()) {
            return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
    }

}
