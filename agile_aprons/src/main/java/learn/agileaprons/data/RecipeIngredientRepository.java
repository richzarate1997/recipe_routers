package learn.agileaprons.data;

import learn.agileaprons.models.RecipeIngredient;

public interface RecipeIngredientRepository {
    boolean create(RecipeIngredient recipeIngredient);
    boolean update(RecipeIngredient recipeIngredient);
    boolean deleteByKey(int recipeId, int ingredientId);
}
