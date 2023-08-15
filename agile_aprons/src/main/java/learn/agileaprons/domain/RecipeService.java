package learn.agileaprons.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import learn.agileaprons.data.*;
import learn.agileaprons.models.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.validation.Validator;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final CuisineRepository cuisineRepository;
    private final IngredientRepository ingredientRepository;
    private final UnitRepository unitRepository;
    private final Validator validator;
    private final WebClient webClient;
    @Value("${spoonacularApiKey}")
    private String apiKey;
    private final String HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
    private static final ObjectMapper mapper = new ObjectMapper();

    public RecipeService(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, CuisineRepository cuisineRepository, IngredientRepository ingredientRepository, UnitRepository unitRepository, Validator validator) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.cuisineRepository = cuisineRepository;
        this.ingredientRepository = ingredientRepository;
        this.unitRepository = unitRepository;
        this.validator = validator;
        this.webClient = WebClient.builder().baseUrl("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com").build();
    }

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Recipe findById(int id) {
        return recipeRepository.findById(id);
    }

    public Result<Recipe> create(Recipe recipe) throws DataException {
        Result<Recipe> result = validate(recipe);

        if (!result.isSuccess()) {
            return result;
        }

        if (recipe.getId() > 0) {
            result.addMessage("Cannot create existing recipe.");
            return result;
        }

        recipe = recipeRepository.create(recipe);
        result.setPayload(recipe);
        return result;
    }

    public Result<Recipe> update(Recipe recipe) throws DataException {
        Result<Recipe> result = validate(recipe);

        if (!result.isSuccess()) {
            return result;
        }

        if (!recipeRepository.update(recipe)) {
            result.addMessage("Recipe doesn't exist.", ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Recipe> deleteById(int recipeId) {
        Result<Recipe> result = new Result<>();
        if (!recipeRepository.deleteById(recipeId)) {
            result.addMessage(String.format("Recipe %s does not exist.", recipeId), ResultType.NOT_FOUND);
        }
        return result;
    }

    public void addIngredients(Result<Recipe> result) {
        Recipe recipe = result.getPayload();
        recipe.getIngredients().forEach(recipeIngredient -> recipeIngredient.setRecipeId(recipe.getId()));
        recipe.getIngredients().forEach(recipeIngredient -> addIngredient(recipeIngredient, result));
    }

    public void updateIngredients(Recipe recipe, Result<Recipe> result) {
        recipeIngredientRepository.deleteByRecipe(recipe.getId());
        recipe.getIngredients().forEach(recipeIngredient -> addIngredient(recipeIngredient, result));
    }

    public Result<Recipe> scrape(int spoonacularId) throws DataException {
        // Collect x-ratelimit-requests-limit, x-ratelimit-requests-remaining,
        // & x-ratelimit-results-reset from request

        Recipe response = webClient.get()
                .uri("/recipes/{spoonacularId}/information", spoonacularId)
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .header("X-RapidAPI-Key", apiKey)
                .header("X-RapidAPI-Host", HOST)
                .retrieve()
                .bodyToMono(SpoonacularRecipe.class)
                .map(this::mapRecipe)
                .block();

        if (response == null) {
            Result<Recipe> failure = new Result<>();
            failure.addMessage("There was an issue with the spoonacular request", ResultType.NOT_FOUND);
            return failure;
        }
        return create(response);
    }

    @Cacheable("Recipes")
    public List<Recipe> search(String param) {
        // Make call to spoonacular for the search param
        List<Recipe> convertedRecipes = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/recipes/complexSearch")
                        .queryParam("query", "{param}")
                        .queryParam("instructionsRequired", true)
                        .queryParam("addRecipeInformation", true)
                        .queryParam("number", "10") // Increase to 25 to round up to 2 point request
                        .queryParam("limitLicense", true)
                        .build(param))
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .header("X-RapidAPI-Key", apiKey)
                .header("X-RapidAPI-Host", HOST)
                .retrieve()
                // Capture the response object
                .bodyToMono(SpoonacularSearchResults.class)
                // Convert the spoonacular-recipes to our model
                .map(spoonacularSearchResults -> mapResults(spoonacularSearchResults.getResults()))
                .block();


        // Search the titles/instructions of recipes from DB
        List<Recipe> dbRecipes = recipeRepository.findAll().stream()
                .filter(recipe -> recipe.getTitle().toLowerCase().contains(param.toLowerCase()) ||
                        recipe.getInstructions().toLowerCase().contains(param.toLowerCase())).toList();
        
        if (convertedRecipes == null) return dbRecipes;
        // Return merged, distinct list of recipes from response and DB
        return Stream.concat(convertedRecipes.stream(), dbRecipes.stream()).toList().stream().distinct().toList();
    }

    private void addIngredient(RecipeIngredient recipeIngredient, Result<Recipe> result) {
        validate(recipeIngredient, result);
        if (!result.isSuccess()) {
            return;
        }
        if (!recipeIngredientRepository.create(recipeIngredient)) {
            result.addMessage("An ingredient was not added.", ResultType.INVALID);
        }
    }

    private Result<Recipe> validate(Recipe recipe) {
        Result<Recipe> result = new Result<>();

        if (recipe == null) {
            result.addMessage("Recipe cannot be null.");
            return result;
        }

        for (var violation : validator.validate(recipe)) {
            result.addMessage(violation.getMessage());
        }

        return result;
    }

    private void validate(RecipeIngredient recipeIngredient, Result<Recipe> result) {

        if (recipeIngredient == null) {
            result.addMessage("Cannot add a null ingredient to recipe.", ResultType.INVALID);
        }

        for (var violation : validator.validate(recipeIngredient)) {
            result.addMessage(violation.getMessage());
        }
    }

    private Recipe mapRecipe(SpoonacularRecipe data) {
        Recipe mappedRecipe = new Recipe();
        List<Cuisine> allCuisines = cuisineRepository.findAll();

        mappedRecipe.setUserId(1); // Attach all scraped recipes to ADMIN user
        mappedRecipe.setTitle(data.getTitle());
        mappedRecipe.setInstructions(data.getInstructions());
        mappedRecipe.setServings(data.getServings());
        mappedRecipe.setCookMinutes(data.getReadyInMinutes());
        // Hard code string format for image url, after encountering null image
        mappedRecipe.setImageUrl(String.format("https://spoonacular.com/recipeImages/%s-556x370.jpg", data.getId()));
        mappedRecipe.setSourceUrl(data.getSourceUrl());
        mappedRecipe.setVegetarian(data.isVegetarian());
        mappedRecipe.setVegan(data.isVegan());
        mappedRecipe.setGlutenFree(data.isGlutenFree());
        mappedRecipe.setDairyFree(data.isDairyFree());

        List<Cuisine> theseCuisines = new ArrayList<>(allCuisines.stream()
                .filter(c -> data.getCuisines().stream()
                        .anyMatch(cString -> cString.equalsIgnoreCase(c.getName()))).toList());
        // by comparing lengths of data.getCuisines() with theseCuisines
        // we can determine whether to add new cuisines
        if (theseCuisines.size() != data.getCuisines().size()) {
            List<String> newCuisines = data.getCuisines().stream()
                    .filter(cString -> theseCuisines.stream()
                            .noneMatch(c -> cString.equalsIgnoreCase(c.getName()))).toList();
            for (String cuisine : newCuisines) {
                Cuisine newCuisine = new Cuisine();
                newCuisine.setName(cuisine);
                newCuisine = cuisineRepository.create(newCuisine);
                theseCuisines.add(newCuisine);
//                System.out.println("New cuisine added: \n" + newCuisine);
            }
        }
        mappedRecipe.setCuisines(theseCuisines);

        mapIngredients(data.getExtendedIngredients(), mappedRecipe);
        return mappedRecipe;
    }

    private void mapIngredients(ArrayList<SpoonacularIngredient> ingredients, Recipe mappedRecipe) {
        List<Ingredient> allIngredients = ingredientRepository.findAll();
        List<Unit> allUnits = unitRepository.findAll();
        List<RecipeIngredient> theseIngredients = new ArrayList<>();

        for (SpoonacularIngredient ing : ingredients) {
            if (ing.getNameClean() == null) continue; // Ex: crockpot liner found in list of ingredients w/o clean name
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setQuantity(ing.getAmount());
//            System.out.println("The spoonacular ingredient unit is: " + ing.getUnit());
            Unit thisUnit = allUnits.stream()
                    // match unit name
                    .filter(unit -> unit.getName().equalsIgnoreCase(ing.getUnit()) ||
                            // or match abbreviation
                            unit.getAbbreviation().equalsIgnoreCase(ing.getUnit()) ||
                            // or pluralize unit to match
                            String.format("%ss", unit.getName()).equalsIgnoreCase(ing.getUnit()))
                    .findFirst().orElse(new Unit()); // create new unit
            if (thisUnit.getId() == 0) {
                thisUnit.setName(ing.getUnit());
                thisUnit.setAbbreviation(ing.getUnit().toLowerCase().substring(0, 2)); // set arbitrary abbreviation
                thisUnit = unitRepository.create(thisUnit);
//                System.out.println("New Unit created: " + thisUnit);
            }
            recipeIngredient.setUnit(thisUnit);

            // find matching ingredient or return new Ingredient object
            Ingredient matchedIngredient = allIngredients.stream()
                    .filter(ingredient -> ingredient.getName().equalsIgnoreCase(ing.getNameClean()))
                    .findFirst().orElse(new Ingredient());
            // if unmatched, create ingredient
            if (matchedIngredient.getId() == 0) {
                matchedIngredient.setName(ing.getNameClean());
                matchedIngredient.setAisle(ing.getAisle());
                matchedIngredient.setImageUrl("https://spoonacular.com/cdn/ingredients_100x100/" + ing.getImage());
                matchedIngredient = ingredientRepository.create(matchedIngredient);
//                System.out.println("New Ingredient created: " + matchedIngredient);
                allIngredients.add(matchedIngredient);
            }
//            else {
//                System.out.println("Ingredient matched: " + matchedIngredient);
//            }

            recipeIngredient.setIngredient(matchedIngredient);
            boolean redundant = false; // redundant ingredient/unit flag
            for (RecipeIngredient ri : theseIngredients) { // iterate through current recipe ingredients
                // if ingredient and unit already used in recipe
                if (ri.getIngredient().equals(recipeIngredient.getIngredient()) &&
                        ri.getUnit().equals(recipeIngredient.getUnit())) {
                    // and the quantities differ, then sum to that quantity and move on
                    if (ri.getQuantity() != recipeIngredient.getQuantity()) {
                        ri.setQuantity(ri.getQuantity() + recipeIngredient.getQuantity());
                    }
                    System.out.println("Redundant ingredient-unit-quantity combo with: " + matchedIngredient.getName() + "-" + thisUnit.getName() + "-" + recipeIngredient.getQuantity());
                    redundant = true;
                    break;
                }
            }
            if (!redundant) { // if ingredient isn't redundant
                // add the new recipeIngredient
                theseIngredients.add(recipeIngredient);
            }
        }
        mappedRecipe.setIngredients(theseIngredients);
    }

    public Recipe matchRecipe(Recipe r) {
        return findAll().stream()
                .filter(recipe -> recipe.getTitle().equalsIgnoreCase(r.getTitle()) &&
                        recipe.getServings() == r.getServings() &&
                        recipe.getCookMinutes() == r.getCookMinutes())
                .findFirst().orElse(null);
    }

    private List<Recipe> mapResults(List<SpoonacularRecipe> results) {
        List<Recipe> convertedRecipes = new ArrayList<>();
        for (SpoonacularRecipe r : results) {
            Recipe result = new Recipe();
            result.setId(r.getId());
            result.setTitle(r.getTitle());
            result.setImageUrl(r.getImage());
            result.setCookMinutes(r.getReadyInMinutes());
            result.setServings(r.getServings());
            Recipe match = matchRecipe(result);
            // if match is null, use result--temporary recipe object
            convertedRecipes.add(Objects.requireNonNullElse(match, result));
        }
        return convertedRecipes;
    }

}
