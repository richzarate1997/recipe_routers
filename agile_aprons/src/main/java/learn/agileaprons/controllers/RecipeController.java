package learn.agileaprons.controllers;

import learn.agileaprons.domain.RecipeService;
import learn.agileaprons.models.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
