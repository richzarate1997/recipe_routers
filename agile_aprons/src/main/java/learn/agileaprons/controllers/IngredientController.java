package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.IngredientService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.models.Ingredient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

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
    public ResponseEntity<Object> create(@RequestBody Ingredient ingredient) throws DataException {
        Result<Ingredient> result = service.create(ingredient);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

}
