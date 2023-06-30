package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.IngredientRepository;
import learn.agileaprons.models.Ingredient;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> findAll() { return ingredientRepository.findAll(); }

    public List<Ingredient> findByName(String name) {return ingredientRepository.findByName(name);}


    public Ingredient findById(int id) {return ingredientRepository.findById(id);}

    public Result<Ingredient> create(Ingredient ingredient) throws DataException {
        Result<Ingredient> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Ingredient>> violations = validator.validate(ingredient);

        if (!violations.isEmpty()){
            for (ConstraintViolation<Ingredient> violation : violations){
                result.addMessage(violation.getMessage());
            }
            return result;
        }
        result.setPayload(ingredientRepository.create(ingredient));

        return result;
    }
    //update and delete tbd, not necessary for mvp


}