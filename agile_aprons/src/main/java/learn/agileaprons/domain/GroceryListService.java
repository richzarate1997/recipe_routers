package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.GroceryListRepository;
import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Recipe;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.util.List;

@Service
public class GroceryListService {
    private final GroceryListRepository groceryListRepository;
    private final Validator validator;

    public GroceryListService(GroceryListRepository groceryListRepository, Validator validator) {
        this.groceryListRepository = groceryListRepository;
        this.validator = validator;
    }

    public List<GroceryList> findAll() {
        return groceryListRepository.findAll();
    }
    public GroceryList findById(int id) { return groceryListRepository.findById(id);}
    public GroceryList findByName(String name, int userId) { return groceryListRepository.findByName(name, userId);}

    public Result<GroceryList> create(GroceryList groceryList) throws DataException {
        Result <GroceryList> result = validate(groceryList);

        if(!result.isSuccess()) {
            return result;
        }

        if(groceryList.getId() != 0) {
            result.addMessage("Cannot create existing Grocery list");
            return result;
        }

        groceryList= groceryListRepository.create(groceryList);
        result.setPayload(groceryList);
        return result;
    }

    public Result<GroceryList> update(GroceryList groceryList) throws DataException {
        Result<GroceryList> result = validate(groceryList);

        if (!result.isSuccess()) {
            return result;
        }

        if (!groceryListRepository.update(groceryList)) {
            String msg = String.format("Grocery list with id: %s, not found.", groceryList.getId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById( int groceryListId ) {return groceryListRepository.deleteById(groceryListId);}

    private Result<GroceryList> validate(GroceryList groceryList) {
        Result<GroceryList> result = new Result<>();

        if (groceryList == null) {
            result.addMessage("Grocery list cannot be null.");
            return result;
        }
        for (var violation: validator.validate(groceryList)) {
            result.addMessage(violation.getMessage());
        }
        return result;
    }
}
