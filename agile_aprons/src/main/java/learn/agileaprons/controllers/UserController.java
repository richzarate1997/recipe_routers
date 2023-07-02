package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.GroceryListService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.domain.UserService;
import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import learn.agileaprons.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private GroceryListService groceryListService;

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable int id) {
        User user = service.findById(id);
        if (user != null) {
            user.getMyLists().forEach(this::addGroceryListIngredients);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{userId}/favorite/{recipeId}")
    public void addFavorite(@PathVariable int userId, @PathVariable int recipeId) {
        service.addFavorite(userId, recipeId);
    }

    @DeleteMapping("/{userId}/favorite/{recipeId}")
    public void deleteFavorite(@PathVariable int userId, @PathVariable int recipeId) {
        service.removeFavorite(userId, recipeId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody @Valid User user,
                                         BindingResult bindingResult) throws DataException {
        if (id != user.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<User> result = service.update(user);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/list/add")
    public ResponseEntity<Object> createGroceryList(@RequestBody @Valid GroceryList groceryList,
                                                    BindingResult bindingResult) throws DataException {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<GroceryList> result = groceryListService.create(groceryList);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/list/update")
    public ResponseEntity<Object> updateGroceryList(@RequestBody @Valid GroceryList groceryList,
                                                    BindingResult bindingResult) throws DataException {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<GroceryList> result = groceryListService.update(groceryList);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{userId}/list/{listId}")
    public ResponseEntity<Void> deleteGroceryListById(@PathVariable int userId, @PathVariable int listId) {
        // Temporary stop on non-matching grocery lists -- wrong user -----------------************
        User user = service.findById(userId);
        if (user.getMyLists().stream().noneMatch(groceryList -> groceryList.getId() == listId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        // ------------------------^^^^^^^^^^^^---------------------------------^^^^^^^^^^^^-------

        if (groceryListService.deleteById(listId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    private void addGroceryListIngredients(GroceryList groceries) {
        groceries.setList(groceryListService.findById(groceries.getId()).getList());
    }
}
