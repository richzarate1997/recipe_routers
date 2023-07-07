package learn.agileaprons.data;

import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Recipe;

import java.util.List;

public interface GroceryListRepository {
    List<GroceryList> findAll();
    GroceryList findById(int id);
    GroceryList findByName(String name, int userId);
    GroceryList create(GroceryList groceryList);
    boolean update(GroceryList groceryList);
    boolean deleteById(int id);
}
