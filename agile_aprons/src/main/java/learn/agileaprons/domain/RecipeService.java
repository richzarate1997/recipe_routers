package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.RecipeRepository;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;
@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> findAll() { return recipeRepository.findAll(); }

    public List<Recipe> findByName(String title) { return recipeRepository.findByTitle(title); }

    public Recipe findById(int id) {return recipeRepository.findById(id);}

    public Result<Recipe> create(Recipe recipe) throws DataException {
        Result<Recipe> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Recipe>> violations = validator.validate(recipe);

        if (!violations.isEmpty()){
            for (ConstraintViolation<Recipe> violation : violations){
                result.addMessage(violation.getMessage());
            }
            return result;
        }
        result.setPayload(recipeRepository.create(recipe));

        return result;
    }

    public Result<Recipe> update(Recipe recipe) throws DataException {
        Result<Recipe> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Recipe>> violations = validator.validate(recipe);

        if (!violations.isEmpty()){
            for (ConstraintViolation<Recipe> violation : violations){
                result.addMessage(violation.getMessage());
            }
            return result;
        }
        if (!recipeRepository.update(recipe)) {
            String msg = String.format("id: %s, not found", recipe.getId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int recipeId) { return recipeRepository.deleteById(recipeId);}
}
