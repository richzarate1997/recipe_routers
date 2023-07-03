package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.GroceryListService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.domain.UserService;
import learn.agileaprons.models.*;
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
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private GroceryListService groceryListService;

    @GetMapping
    public ResponseEntity<User> findById(@RequestBody User u) {
        User user = service.findById(u.getId());
        if (user != null) {
            user.getMyLists().forEach(this::addGroceryListIngredients);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/favorite")
    public void addFavorite(@RequestBody UserFavorite userFavorite) {
        service.addFavorite(userFavorite.getUserId(), userFavorite.getRecipeId());
    }

    @DeleteMapping("/favorite")
    public void deleteFavorite(@RequestBody UserFavorite userFavorite) {
        service.removeFavorite(userFavorite.getUserId(), userFavorite.getRecipeId());
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody @Valid User user,
                                         BindingResult bindingResult) throws DataException {
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

    @PostMapping("/list")
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

    @PutMapping("/list")
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

    @DeleteMapping("/list")
    public ResponseEntity<Void> deleteGroceryList(@RequestBody GroceryList list) {
        User user = service.findById(list.getUserId());
        if (user.getMyLists().stream().noneMatch(groceryList -> groceryList.getId() == list.getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        if (groceryListService.deleteById(list.getId())) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    private void addGroceryListIngredients(GroceryList groceries) {
        groceries.setList(groceryListService.findById(groceries.getId()).getList());
    }
}
