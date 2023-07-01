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

    public List<Recipe> findByTitle(String title) {
        return recipeRepository.findByTitle(title);
    }

    public Recipe findById(int id) {
        return recipeRepository.findById(id);
    }

    public Result<Recipe> create(Recipe recipe) throws DataException {
        Result<Recipe> result = validate(recipe);

        if (!result.isSuccess()) {
            return result;
        }

        if (recipe.getId() != 0) {
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
            String msg = String.format("Recipe with id: %s, not found.", recipe.getId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int recipeId) {
        return recipeRepository.deleteById(recipeId);
    }

    public Result<Void> addIngredient(RecipeIngredient recipeIngredient) {
        Result<Void> result = validate(recipeIngredient);

        if (!result.isSuccess()) {
            return result;
        }

        if (!recipeIngredientRepository.create(recipeIngredient)) {
            result.addMessage("An ingredient was not added.", ResultType.INVALID);
        }

        return result;
    }

    public Result<Void> updateIngredient(RecipeIngredient recipeIngredient) {
        Result<Void> result = validate(recipeIngredient);

        if (!result.isSuccess()) {
            return result;
        }

        if (!recipeIngredientRepository.update(recipeIngredient)) {
            String msg = String.format("Update failed for recipe id %s, ingredient %s: not found.",
                    recipeIngredient.getRecipeId(),
                    recipeIngredient.getIngredient().getId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteIngredientByKey(int recipeId, int ingredientId) {
        return recipeIngredientRepository.deleteByKey(recipeId, ingredientId);
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

    private Result<Void> validate(RecipeIngredient recipeIngredient) {
        Result<Void> result = new Result<>();

        if (recipeIngredient == null) {
            result.addMessage("Cannot add a null ingredient to recipe.", ResultType.INVALID);
        }

        for (var violation : validator.validate(recipeIngredient)) {
            result.addMessage(violation.getMessage());
        }

        return result;
    }



}
