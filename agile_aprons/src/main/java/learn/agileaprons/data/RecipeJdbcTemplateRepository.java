package learn.agileaprons.data;

import learn.agileaprons.models.Recipe;

import java.util.List;

public class RecipeJdbcTemplateRepository implements RecipeRepository {
    @Override
    public List<Recipe> findAll() {
        return null;
    }

    @Override
    public Recipe findById(int id) {
        return null;
    }

    @Override
    public Recipe findByName(String name) {
        return null;
    }

    @Override
    public Recipe add(Recipe recipe) {
        return null;
    }

    @Override
    public boolean update(Recipe recipe) {
        return false;
    }

    @Override
    public boolean deleteById(int id) {
        return false;
    }
}
