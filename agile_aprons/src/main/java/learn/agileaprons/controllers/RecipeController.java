package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.RecipeService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.models.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService service;

    @GetMapping
    public List<Recipe> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> findById(@PathVariable int id) {
        Recipe recipe = service.findById(id);
        if (recipe != null) {
            return new ResponseEntity<>(recipe, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search/{param}")
    public List<Recipe> findByTitle(@PathVariable String param) {
        return service.findAll().stream()
                .filter(recipe -> recipe.getTitle().toLowerCase().contains(param.toLowerCase()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid Recipe recipe,
                                         BindingResult bindingResult) throws DataException {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<Recipe> result = service.create(recipe);
        if (result.isSuccess()) {
            service.addIngredients(result);
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable int id,
                                         @RequestBody @Valid Recipe recipe,
                                         BindingResult bindingResult) throws DataException {
        if (id != recipe.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(err -> err.getDefaultMessage())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<Recipe> result = service.update(recipe);
        if (result.isSuccess()) {
            service.updateIngredients(recipe, result);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable int id) {
        Result<Recipe> result = service.deleteById(id);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/scrape")
    public ResponseEntity<Object> findOrScrape(@RequestBody Recipe r) throws DataException{
        Recipe match = service.findAll().stream()
                .filter(recipe -> recipe.getTitle().equalsIgnoreCase(r.getTitle()) &&
                        recipe.getServings() == r.getServings() &&
                        recipe.getCookMinutes() == r.getCookMinutes())
                .findFirst().orElse(null);
        if (match != null) {
            System.out.println("[findOrScrape] match returns: " + service.findById(match.getId()));
            return new ResponseEntity<>(match, HttpStatus.OK);
        } else {
            Result<Recipe> result = service.scrape(r.getId());
            if (result.isSuccess()) {
                service.addIngredients(result);
                System.out.println("[findOrScrape] scrape returns: " + result.getPayload());
                return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
            }
            return ErrorResponse.build(result);
        }
    }

}
