package learn.agileaprons.domain;

import learn.agileaprons.data.*;
import learn.agileaprons.models.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.validation.Validator;
import java.util.ArrayList;
import java.util.List;

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
        Recipe response = webClient.get()
                .uri("/recipes/{spoonacularId}/information", spoonacularId)
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .header("X-RapidAPI-Key", apiKey)
                .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
                .retrieve()
                .bodyToMono(SpoonacularRecipe.class)
                .map(this::mapRecipe)
                .block();
        return create(response);
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

        mappedRecipe.setUserId(1); // Attach all scraped recipes to ADMIN
        mappedRecipe.setTitle(data.getTitle());
        mappedRecipe.setInstructions(data.getInstructions());
        mappedRecipe.setServings(data.getServings());
        mappedRecipe.setCookMinutes(data.getReadyInMinutes());
        mappedRecipe.setImageUrl(data.getImage());
        mappedRecipe.setSourceUrl(data.getSourceUrl());
        mappedRecipe.setVegetarian(data.isVegetarian());
        mappedRecipe.setVegan(data.isVegan());
        mappedRecipe.setGlutenFree(data.isGlutenFree());
        mappedRecipe.setDairyFree(data.isDairyFree());

        List<Cuisine> theseCuisines = allCuisines.stream()
                .filter(c -> data.getCuisines().stream()
                        .anyMatch(cString -> cString.equalsIgnoreCase(c.getName()))).toList();
        mappedRecipe.setCuisines(theseCuisines);

        mapIngredients(data.getExtendedIngredients(), mappedRecipe);
        System.out.println(mappedRecipe);

        return mappedRecipe;
    }

    private void mapIngredients(ArrayList<SpoonacularIngredient> ingredients, Recipe mappedRecipe) {
        List<Ingredient> allIngredients = ingredientRepository.findAll();
        List<Unit> allUnits = unitRepository.findAll();
        List<RecipeIngredient> theseIngredients = new ArrayList<>();

        for (SpoonacularIngredient ing : ingredients) {
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setQuantity(ing.getAmount());
            Unit thisUnit = allUnits.stream()
                            // match unit name
                    .filter(unit -> unit.getName().equalsIgnoreCase(ing.getUnit()) ||
                            // or match abbreviation
                            unit.getAbbreviation().equalsIgnoreCase(ing.getUnit()) ||
                            // or pluralize unit to match
                            String.format("%ss", unit.getName()).equalsIgnoreCase(ing.getUnit()))
                    .findFirst().orElse(null);
            recipeIngredient.setUnit(thisUnit);
            if (recipeIngredient.getUnit() == null) {
                System.out.printf("Unable to match the unit for Ingredient: %s Unit: %s%n", ing.getName(), ing.getUnit());
            }
            // find matching ingredient
            Ingredient matchedIngredient = allIngredients.stream()
                    .filter(ingredient -> ingredient.getName().equalsIgnoreCase(ing.getName()))
                    .findFirst().orElse(new Ingredient());
            // if unmatched, create ingredient
            if (matchedIngredient.getId() == 0) {
                matchedIngredient.setName(ing.getName());
                matchedIngredient.setAisle(ing.getAisle());
                matchedIngredient.setImageUrl("https://spoonacular.com/cdn/ingredients_100x100/" + ing.getImage());
                matchedIngredient = ingredientRepository.create(matchedIngredient);
            }

            recipeIngredient.setIngredient(matchedIngredient);
            theseIngredients.add(recipeIngredient);
        }
        mappedRecipe.setIngredients(theseIngredients);
    }

}
