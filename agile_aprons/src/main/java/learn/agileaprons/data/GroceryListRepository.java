package learn.agileaprons.data;

import learn.agileaprons.models.GroceryList;

import java.util.List;

public interface GroceryListRepository {
    GroceryList findById(int id);
    GroceryList create(GroceryList list);
    boolean update(GroceryList list);
    boolean deleteById(int id);
}
