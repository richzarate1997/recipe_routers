package learn.agileaprons.data;

import learn.agileaprons.models.Ingredient;

import java.util.List;

public interface IngredientRepository {
    List<Ingredient> findAll();
    Ingredient findById(int id);
    List<Ingredient> findByName(String name);
    Ingredient create(Ingredient ingredient);
    boolean update(Ingredient ingredient);
    boolean deleteById(int id);
}
