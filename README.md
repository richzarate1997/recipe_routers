# recipe_routers
Dev10 Capstone Project
By: Alice Wu, Coren Frankel, Richard Zarate

### Plan

## Back End (17.5 hrs/ 3 Days)
* [ ] Build a database (1 hr)
    * [ ] Draft a schema with DDL
    * [ ] Table Diagram with Relationships

* [ ] Dependencies (10 min)
    * [ ] Spring framework boot starter
    * [ ] JUnit Testing
    * [ ] JJWT 
    * [ ] MySQL Connector

* [ ] Models & Packages (1.5 hr)
    * [ ] App User
        * `int id`
        * `String email`
        * `String displayName`
        * `Password password / hash`
        * `boolean enabled`
        * `Authorities authorities`
        * `<Granted Authority> grantedAuthority`
        * `List of Recipes myRecipes`
        * `List of Recipes favoriteRecipes`
        * `List of Grocery Lists` can add more lists
    * [ ] Recipes
        * `int id`
        * `String title`
        * `String imgUrl`
        * `String image` binary string - blob
        * (FK in DB)`List of Ingredients`
        * `List String Cuisine Type`
        * `String Instructions`
        * `boolean isVegetarian`
        * `boolean isGlutenFree`
        * `boolean isDairy`
        * `boolean isVegan`
        * `int servings`
        * `String srcUrl` links back to original recipe or our users page
        * `int appUserId` can be null if not original
        * `LocalTime cookTime`
    * [ ] Grocery List
        * `int userId`
        * `List of Ingredients`
        * `int groceryListId`
    * [ ] Ingredients
        * `String name`
        * `String imgUrl`
        * `int id`
        * `String Aisle`
        * `Measurement`
    * [ ] Recipe Ingredient
        * `double quantity`
        * `int recipeId`
        * `int ingredientId`
        * `int measurementId`
    * [ ] Measurement
        * `String name`
        * `String abbrv`
        * `int id`

* [ ] Data (3-3.5 hrs)
    * [ ] Mappers
        * [ ] Map ingredient quantity to recipe
    * [ ] App Users Repo / Interface
    * [ ] DataAccessException
    * [ ] Recipes Repo / Interface   
    * [ ] Grocery List Repo / Interface
    * [ ] Ingredients Repo / Interface
    * [ ] Testing

* [ ] Domain (4-4.5 hrs)
* Java Validation Api
    * [ ] Result / Result Type 
    * [ ] Recipe Service
    * [ ] Grocery List Service
    * [ ] Ingredients Service
    * [ ] Testing

* [ ] Security (3.5-4 hrs)
    * [ ] App User Service
    * [ ] JWT Converter
    * [ ] JWT Request Filter
    * [ ] Security Config
    * [ ] Testing

* [ ] Controller (3 hrs)
    * [ ] Recipe Controller
    * [ ] Auth Controller
    * [ ] ErrorResponse
    * [ ] GlobalExceptionHandler
    * [ ] Ingredient Controller?????
    * [ ] Grocery List Controller
    * [ ] Testing


* [ ] Root / learn
    * [ ] App
    * [ ] App Config



 ## Front End
* [ ] Fun Fact / Joke Under Search Bar (title page / login only)
* [ ] wire frames



## Stretch Goals
* [ ] Add nutrition facts / info
* [ ] Pair alcohol/cocktails with a cuisine / recipe
* [ ] Widgets 
* [ ] Chatbox


