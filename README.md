# GetYum
Dev10 Capstone Project - *Recipe Routers*
By: Alice Wu, Coren Frankel, Richard Zarate 

## Proposal
We are building a recipe-to-shopping list application that will rely on multiple APIs, a React UI, and Java with MySQL server and database. User accounts will be able to create, read, update & delete recipes from our database. They can also interact with their own curated list of favorite recipes. The secondary functionality of the app allows users to interact with a grocery list feature that correlates with the recipes they may be planning to cook by adding, reading, updating and deleting ingredients from their main or independent lists. 

The front end will be a dynamic mobile-friendly UI using React, MaterialUI for styles, and the `any-unit-converter` js library for measurement displays based on user preference. The Java API will store user and API retrieved recipes for user interaction from our MySQL database. Our Java API will implement a three layer MVC architecture using Spring Boot Annotations and the validation API.  

We will begin development from the database through the server with testing before implementing the UI. Our development strategy will be dominantly horizontal in order to guarantee the functionality of our layers as they are built. 

Today we will return a schedule of tasks, database schema, class diagram with layers, and begin developing wireframes for the UI.One of our goals will be to finalize the Java API together by Wednesday 6/28, and then branch out to tackle the UI components and API integration.

## Schedule of Tasks

### Back End (17.5 hrs/ 3 Days)
* [x] Build database (5 hr)
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

* [x] Models & Packages (3 - 3.5 hr)
  * [x] Java Validation API Annotations
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
        * `byte [] image`
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
    * [x] UserFavorite
        * `int userId`
        * `int recipeId`

* [x] Data (13-24 hrs)
    * [x] Mappers
    * [x] App User Repo / Interface
    * [x] User Repo / Interface
    * [x] DataAccessException
    * [x] Recipe Repo / Interface
    * [x] RecipeIngredient Repo / Interface
    * [x] Grocery List Repo / Interface
    * [x] Ingredients Repo / Interface
    * [x] Unit Repo / Interface
    * [x] Cuisine Repo / Interface
    * [x] Testing

* [x] Domain (4-4.5 hrs)
  * [x] Java Validation API
    * [x] Result / Result Type 
    * [x] User Service
    * [x] Recipe Service
    * [x] Grocery List Service
    * [x] Ingredient Service
    * [x] Unit Service
    * [x] Cuisine Service
    * [x] Testing

* [ ] Security (1.5 hrs)
    * [x] App User Service
    * [x] Credentials
    * [x] JWT Converter
    * [x] JWT Request Filter
    * [ ] Security Config -- Authorized Routes
    * [x] Manual Testing

* [x] Controller (3 hrs)
    * [x] Auth Controller
    * [x] UserController
    * [x] Ingredient Controller
    * [x] Recipe Controller
    * [x] Unit Controller
    * [x] ErrorResponse
    * [x] GlobalExceptionHandler
    * [x] Manual Testing

* [x] Root / learn (5 mins)
    * [x] App
    * [x] App Config

### Front End (20 hr - 4 days)
* [x] Wire frames / "User Stories" (3 hrs)
  * Style Inspirations: 
    * Google Minimalism
    * Light theme -- AllRecipes.com
    * MaterialUI Component Library

* Clients:
  * [x] Web UI
    * [x] Register - Adapt login form to be reused for registering 
    * [x] createUser endpoint from authApi, and redirect backward
    * [x] Recipe Form - Parent component with stepper
      * [x] 5 sub components for each part
      * [x] save recipe on last step
      * [x] Create 
    * [x] Spotify Webplayer API 
  * [ ] Mobile UI - ***Main Learning Goal***
    * [ ] Prepare development environment for Mobile

* [x] Dependecies: `npm install`:
  * [x] ==materialUI== `@mui/material @emotion/react @emotion/styled`
  * [x] ==mui icons== `@mui/icons-material`
  * [x] ==axios== `axios` ==Add'l Learning Goal==
  * [x] ==axios-jwt== `--save axios-jwt`
  * [x] dependant on jwt-decode
  * [x] ==any-unit-converter== `any-unit-converter@latest`
  * Mobile Specific:
    * [ ] ==React Native== `react-native` + `npm install --save @react-native-async-storage/async-storage` + `npx pod-install`

* [ ] Components (10 hrs)
  * [x] Form - Add/Update Recipes
  * [x] List - Search Results
  * [x] Card - Individual Result
  * [x] NavBar - Perhaps include search bar
  * [x] Search Bar
  * [x] LoginForm
  * [x] RegisterForm
  * [x] Footer - Sticky Footer
  * [x] About
  * [x] Profile
    * [x] Tabs for Faves, User Recipes, & Lists
    * [ ] Lists for grocery lists
    * [x] GroceryList
* [x] Routes (1.5 hr)
  * [x] `/` Home - Search Bar - NavBar
  * [x] `/login` LoginForm
  * [x] `/register` RegisterForm
  * [x] `/recipes` List - Card
  * [x] `/about` About
  * [x] `/profile` Profile
  * [x] `/new/recipe` Form
  * [x] `/update/recipe` Form
  * [x] `/list/:list_id` GroceryList
* [x] Services (2 - 3.5 hrs)

  * [x] Spoonacular Endpoints using Axios
    * [x] Search Recipes
    * [x] Get Recipe
    * [x] Get Joke/Trivia
  * [x] Java API Endpoints using Axios
    * [x] Search Recipes
    * [x] Get Recipe
    * [x] Get User
    * [ ] etc
  * [x] State Management (1 hr)
    * [x] AuthContext

* [x] App assets
  * [x] favicon
  * [x] Avatar Defaults

### Add'l Feature Ideas
* [ ] Display nutrition facts / info -- implement widget call

### Stretch Goals & Ambitions
* [ ] Pair alcohol/cocktails with a cuisine / recipe
* [ ] Widgets 
* [ ] Chatbox
* [ ] DemoUser Login Button

### Considerations
* [ ] App User Roles include Guest, Admin, User
  * Guest Exp: Persist recipe until login/register then return redirect to recipe view
* [ ] Deal with duplicate Ingredients/Recipes by overriding equals methods and preparing for equivalence comparison with internal objects.

### Short Term Task List
* [ ] Transition recipe results component to consume java API
* [ ] Adapt all spoonacular requests into the java API
  * [ ] Create endpoint in recipe controller for fetching recipes
  * [ ] Create service method(s) to match or consume new recipes and deliver all results
  * [ ] Blend recipes from DB and spoonacular results in search
* [ ] Create spoonacular consumption logic to eliminate over-consumption of free tier

*==Add'l Learning Goal==