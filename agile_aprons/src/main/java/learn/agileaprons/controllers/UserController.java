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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            user.getMyLists().forEach(groceryList -> addGroceryListIngredients(groceryList));
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody @Valid User user,
                                         BindingResult bindingResult) throws DataException {
        if (id != user.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(err -> err.getDefaultMessage())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Result<User> result = service.update(user);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("{userId}/list/delete/{listId}")
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
