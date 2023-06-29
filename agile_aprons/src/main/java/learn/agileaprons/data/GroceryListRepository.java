package learn.agileaprons.data;

import learn.agileaprons.models.GroceryList;

import java.util.List;

public interface GroceryListRepository {
    GroceryList findById(int id);
    GroceryList create(GroceryList groceryList);
    boolean update(GroceryList groceryList);
    boolean deleteById(int id);
}
