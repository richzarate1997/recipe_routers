package learn.agileaprons.data;

import learn.agileaprons.models.Ingredient;

import java.util.List;

public interface IngredientRepository {
    List<Ingredient> findAll();
    Ingredient findById(int id);
    Ingredient findByName(String name);
    Ingredient create(Ingredient ingredient);
}
