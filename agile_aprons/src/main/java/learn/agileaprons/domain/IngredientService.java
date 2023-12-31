package learn.agileaprons.domain;

import learn.agileaprons.data.IngredientRepository;
import learn.agileaprons.models.Ingredient;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.util.List;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final Validator validator;

    public IngredientService(IngredientRepository ingredientRepository, Validator validator) {
        this.ingredientRepository = ingredientRepository;
        this.validator = validator;
    }

    public List<Ingredient> findAll() { return ingredientRepository.findAll(); }

    public List<Ingredient> findByName(String name) {return ingredientRepository.findByName(name);}


    public Ingredient findById(int id) {return ingredientRepository.findById(id);}

    public Result<Ingredient> create(Ingredient ingredient) {
        Result<Ingredient> result = validate(ingredient);

        if (!result.isSuccess()) {
            return result;
        }

        if (ingredient.getId() > 0) {
            result.addMessage("Cannot create existing Ingredient");
            return result;
        }

        ingredient = ingredientRepository.create(ingredient);
        result.setPayload(ingredient);
        return result;
    }

    private Result<Ingredient> validate(Ingredient ingredient) {
        Result<Ingredient> result = new Result<>();

        if (ingredient == null) {
            result.addMessage("Ingredient cannot be null");
            return result;
        }

        for (var violation : validator.validate(ingredient)) {
            result.addMessage(violation.getMessage());
        }

        return result;
    }

    //update and delete tbd, not necessary for mvp


}