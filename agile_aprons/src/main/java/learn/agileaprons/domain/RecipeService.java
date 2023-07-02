package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.RecipeIngredientRepository;
import learn.agileaprons.data.RecipeRepository;
import learn.agileaprons.models.Recipe;
import learn.agileaprons.models.RecipeIngredient;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final Validator validator;

    public RecipeService(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, Validator validator) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.validator = validator;
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

        for (var violation: validator.validate(recipe)) {
            result.addMessage(violation.getMessage());
        }

        return result;
    }

    private Result<Recipe> validate(RecipeIngredient recipeIngredient, Result<Recipe> result) {

        if (recipeIngredient == null) {
            result.addMessage("Cannot add a null ingredient to recipe.", ResultType.INVALID);
        }

        for (var violation : validator.validate(recipeIngredient)) {
            result.addMessage(violation.getMessage());
        }

        return result;
    }



}
