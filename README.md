# recipe_routers
Dev10 Capstone Project
By: Alice Wu, Coren Frankel, Richard Zarate

## Proposal
We are building a recipe-to-shopping list application that will rely on multiple APIs, a React UI, and Java with MySQL server and database. User accounts will be able to create, read, update & delete recipes from our database. They can also interact with their own curated list of favorite recipes. The secondary functionality of the app allows users to interact with a grocery list feature that correlates with the recipes they may be planning to cook by adding, reading, updating and deleting ingredients from their main or independent lists. 

The front end will be a dynamic mobile-friendly UI using React, MaterialUI for styles, and the `any-unit-converter` js library for measurement displays based on user preference. The Java API will store user and API retrieved recipes for user interaction from our MySQL database. Our Java API will implement a three layer MVC architecture using Spring Boot Annotations and the validation API.  

We will begin development from the database through the server with testing before implementing the UI. Our development strategy will be dominantly horizontal in order to guarantee the functionality of our layers as they are built. 

Today we will return a schedule of tasks, database schema, class diagram with layers, and begin developing wireframes for the UI.One of our goals will be to finalize the Java API together by Wednesday 6/28, and then branch out to tackle the UI components and API integration.

## Schedule of Tasks

### Back End (17.5 hrs/ 3 Days)
* [x] Build database (1 hr)
    * [x] Draft schema with DDL
    * [x] Table Diagram with Relationships

* [x] Dependencies (10 min)
    * [x] Spring framework boot/starter
      * [x] devtools
      * [x] validation
      * [x] web
      * [x] test
      * [x] jdbc
      * [x] security
    * [x] JUnit Testing
    * [x] JJWT 
      * [x] api
      * [x] impl
      * [x] jackson
    * [x] MySQL Connector

* [x] Models & Packages (2 - 2.5 hr)
  * [ ] Java Validation API Annotations
    * [x] App User
        * `int id`
        * `String email`
        * `String displayName`
        * `String password`
        * `boolean enabled`
        * `Collection<Granted Authority> grantedAuthority`
        * `List<Recipe> myRecipes`
        * `List<Recipe> myFavorites`
        * `List<GroceryList> myLists`
    * [x] Recipes
        * `int id`
        * `String title`
        * `String imgUrl`
        * `Blob image`
        * `List<Ingredients> ingredients`
        * `List<Cuisine> cuisines`
        * `String instructions`
        * `boolean isVegetarian`
        * `boolean isGlutenFree`
        * `boolean isDairy`
        * `boolean isVegan`
        * `int servings`
        * `String srcUrl` links back to original recipe or our users page
        * `int appUserId` can be null if not original
        * `int cookMinutes`
    * [x] Grocery List
        * `int id`
        * `String name`
        * `List<Ingredient> list`
    * [x] Ingredient
        * `int id`
        * `String name`
        * `Double quantity`
        * `Unit unit`
        * `String imageUrl`
        * `String aisle`
    * [x] Unit
        * `int id`
        * `String name`
        * `String abbrev`
    * [x] Cuisine
        * `int id`
        * `String name`

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
  * Java Validation API
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
    * [ ] AppUserController
    * [ ] Auth Controller
    * [ ] ErrorResponse
    * [ ] GlobalExceptionHandler
    * [ ] Ingredient Controller?????
    * [ ] Grocery List Controller
    * [ ] Testing

* [ ] Root / learn (5 mins)
    * [x] App
    * [ ] App Config



### Front End (20 hr - 4 days)
* [x] Wire frames / "User Stories" (3 hrs)
  * Style Inspirations: 
    * Google Minimalism
    * Light theme -- AllRecipes.com
    * MaterialUI Component Library

* Clients:
  * [ ] Web UI
  * [ ] Mobile UI - ***Main Learning Goal***
    * [ ] Prepare development environment for Mobile

* [ ] Dependecies: `npm install`:
  * [ ] ==materialUI== `@mui/material @emotion/react @emotion/styled`
  * [ ] ==mui icons== `@mui/icons-material`
  * [ ] ==axios== `axios` ==Add'l Learning Goal==
  * [ ] ==axios-jwt== `--save axios-jwt` 
    * dependant on jwt-decode
  * [ ] ==any-unit-converter== `any-unit-converter@latest`
  * Mobile Specific:
    * [ ] ==React Native== `react-native` + `npm install --save @react-native-async-storage/async-storage` + `npx pod-install`

* [ ] Components (10 hrs)
  * [ ] Home
  * [ ] Form - Add/Update Recipes
  * [ ] List - Search Results
  * [ ] Card - Individual Result
  * [ ] NavBar - Perhaps include search bar
  * [ ] Search Bar
  * [ ] LoginForm
  * [ ] RegisterForm
  * [ ] Footer - Sticky Footer
  * [ ] About
  * [ ] UserHome
    * [ ] Tabs for Faves, User Recipes, & Lists
    * [ ] Lists for grocery lists
  * [ ] GroceryList
* [ ] Routes (1 hr)

  * [ ] `/` Home - Search Bar - NavBar
  * [ ] `/login` LoginForm
  * [ ] `/register` RegisterForm
  * [ ] `/search/:query` List - Card
  * [ ] `/about` About
  * [ ] `/home` UserHome
  * [ ] `/add` Form
  * [ ] `/update/:id` Form
  * [ ] `/list/:list_id` GroceryList
* [ ] Services (2 - 3.5 hrs)

  * [ ] Spoonacular Endpoints using Axios
  * [ ] Java API Endpoints using Axios
  * [ ] State Management - Contexts (1 hr)
    * [ ] AuthContext
    * [ ] RecipeContext


### Presentation (3 hrs)
* [ ] Slideshow (~8 min duration)
  * [ ] Individual mini-bios for dev team
  * [ ] Technologies Used
  * [ ] Problem Our App addresses / aims to solve
  * [ ] Challenges / Failures
  * [ ] Successes / Extra-Curricular Endeavours

* [ ] Application Demonstration (~7 min duration)
  * [ ] Landing Page -> Login
  * [ ] Registration -> App Usage
  * [ ] Recipe Search -> Favoriting
  * [ ] Recipe View -> Grocery List
  * [ ] Grocery List Ingredient Checking / Removal
  * [ ] Mobile vs. Web UI

* [ ] Time for Questions (5+ min)

### Add'l Feature Ideas
* [ ] Food Fact / Joke Under Search Bar (title page / login only)
* [ ] Display nutrition facts / info -- implement widget call


### Stretch Goals & Ambitions
* [ ] Pair alcohol/cocktails with a cuisine / recipe
* [ ] Widgets 
* [ ] Chatbox
* [ ] DemoUser Login Button


### Considerations
* [ ] Use @Transactional annotation to ensure all ingredients are added before adding a recipe?
* [ ] App User Roles include Guest, Admin, User
  * Guest Exp: Persist recipe until login/register then return redirect to recipe view



*==Add'l Learning Goal==