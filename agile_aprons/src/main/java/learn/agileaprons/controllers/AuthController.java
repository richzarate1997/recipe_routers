package learn.agileaprons.controllers;

import learn.agileaprons.data.DataException;
import learn.agileaprons.domain.GroceryListService;
import learn.agileaprons.domain.Result;
import learn.agileaprons.domain.UserService;
import learn.agileaprons.models.AppUser;
import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.User;
import learn.agileaprons.security.AppUserService;
import learn.agileaprons.security.Credentials;
import learn.agileaprons.security.JwtConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
@RestController
@ConditionalOnWebApplication
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtConverter jwtConverter;
    private final AppUserService appUserService;
    private final UserService userService;
    private final GroceryListService groceryListService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter jwtConverter, AppUserService appUserService, UserService userService, GroceryListService groceryListService) {
        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
        this.appUserService = appUserService;
        this.userService = userService;
        this.groceryListService = groceryListService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticate(@RequestBody Credentials credentials) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                credentials.getUsername(), credentials.getPassword());

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                AppUser appUser = (AppUser) authentication.getPrincipal();
                return new ResponseEntity<>(makeAppUserTokenMap(appUser), HttpStatus.OK);
            }

        } catch (AuthenticationException e) {
            System.out.println(e);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(@AuthenticationPrincipal AppUser appUser) {
        return new ResponseEntity<>(makeAppUserTokenMap(appUser), HttpStatus.OK);
    }

    @PostMapping("/create-account")
    public ResponseEntity<Object> create(@RequestBody Credentials credentials) throws DataException {
        Result<AppUser> result = appUserService.create(credentials);

        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        HashMap<String, Integer> map = new HashMap<>();
        map.put("appUserId", result.getPayload().getAppUserId());
        User user = new User(result.getPayload().getAppUserId(), credentials.getUsername());
        Result<User> newUser = userService.create(user);
        if (!newUser.isSuccess()) {
            return new ResponseEntity<>("There was a problem creating user settings.", HttpStatus.CONFLICT);
        }
        ArrayList<Ingredient> ingredients = new ArrayList<>();
        GroceryList groceryList = new GroceryList(result.getPayload().getAppUserId(), "Main", ingredients);
        Result<GroceryList> newGroceryList = groceryListService.create(groceryList);
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    private HashMap<String, String> makeAppUserTokenMap(AppUser appUser) {
        HashMap<String, String> map = new HashMap<>();
        String jwtToken = jwtConverter.getTokenFromUser(appUser);
        map.put("jwt_token", jwtToken);
        return map;
    }
}
