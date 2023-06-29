package learn.agileaprons.data;

import learn.agileaprons.models.GroceryList;


public class GroceryListJdbcTemplateRepository implements GroceryListRepository{
    @Override
    public GroceryList findById(int id) {
        return null;
    }

    @Override
    public GroceryList create(GroceryList list) {
        return null;
    }

    @Override
    public boolean update(GroceryList list) {
        return false;
    }

    @Override
    public boolean deleteById(int id) {
        return false;
    }
}
