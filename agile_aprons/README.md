## Java Api Paths

### Authenticate / Security
*  `/security`
    * `/authenticate`
    * `/refresh-token`
    * `/create-account`

### Cuisine
* `/api/cuisine`
    * find all: base url (GET)

### Ingredient 
* `/api/ingredient`
    * find by id: `/{id}` (GET)
    * create: base url (POST)

### Recipe
* `/api/recipe`
    * find all: base url (GET)
    * find by id: `/{id}` (GET)
    * find by title: `search/{param}` (GET)
    * create: base url (POST)
    * update: `/{id}` (PUT)
    * delete: `/{id}` (DELETE)

### Unit
*  `/api/unit`
    * find all: base url (GET)

### User
* `/api/user`
    * find by id: `/{id}` (GET)
    * add favorite: `/{userId}/favorite/{recipeId}` (POST)
    * delete favorite: `/{userId}/favorite/{recipeId}` (DELETE)
    * update: `/{id}` (PUT)
    * create grocery list: `/list/add` (POST)
    * update grocery list: `/list/update` (PUT)
    * delete grocery list: `/{userId}/list/{listId}` (DELETE)

