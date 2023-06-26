# recipe_routers
Dev10 Capstone Project
By: Alice Wu, Coren Frankel, Richard Zarate

### Plan

## Back End
* [ ] Build a database (1 hr)
    * [ ] Draft a schema with DDL
    * [ ] Table Diagram with Relationships

* [ ] Dependencies 
    * [ ] Spring framework boot starter
    * [ ] JUnit Testing
    * [ ] JJWT 
    * [ ] MySQL Connector

* [ ] Models & Packages
    * [ ] App User
    * [ ] Recipes
        * `int id`
        * `String title`
        * `String imgUrl`
        * (FK in DB)`List of Ingredients`
        * `List String Cuisine Type`
        * `String Instructions`
        * `boolean isVegetarian`
        * `boolean isGlutenFree`
        * `boolean isDairy`
        * `boolean isVegan`
        * `int servings`
        * `String author`
        * `LocalTime cookTime`
    * [ ] Grocery List

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

* [ ] Data
    * [ ] Mappers
        * [ ] Map ingredient quantity to recipe
    * [ ] App Users Repo / Interface
    * [ ] DataAccessException
    * [ ] Recipes Repo / Interface   
    * [ ] Grocery List Repo / Interface
    * [ ] Ingredients Repo / Interface

* [ ] Domain
    * [ ] Result / Result Type 
    * [ ] Recipe Service
    * [ ] Grocery List Service
    * [ ] Ingredients Service

* [ ] Security
    * [ ] App User Service
    * [ ] JWT Converter
    * [ ] JWT Request Filter
    * [ ] Security Config

* [ ] Root / learn
    * [ ] App
    * [ ] App Config

* [ ] Testing 

 ## Front End
* [ ] Fun Fact / Joke Under Search Bar


