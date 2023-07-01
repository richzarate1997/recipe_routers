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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService service;

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
        return service.findByTitle(param);
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
            recipe.setId(result.getPayload().getId());
            recipe.getIngredients().forEach(recipeIngredient ->
                    recipeIngredient.setRecipeId(recipe.getId()));
            List<Result<Void>> results = new ArrayList<>();
            recipe.getIngredients().forEach(recipeIngredient ->
                    results.add(service.addIngredient(recipeIngredient)));
            if (results.stream().allMatch(Result::isSuccess)) {
                return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
    }

}
