package learn.agileaprons.data.mappers;

import learn.agileaprons.models.IngredientRecipe;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class IngredientRecipeMapper implements RowMapper<IngredientRecipe> {
    @Override
    public IngredientRecipe mapRow(ResultSet rs, int rowNum) throws SQLException {
        IngredientRecipe ingredientRecipe = new IngredientRecipe();
        ingredientRecipe.setIngredientId(rs.getInt("ingredient_id"));
        ingredientRecipe.setQuantity(rs.getDouble("quantity"));
        ingredientRecipe.setUnitId(rs.getInt("unit_id"));

        RecipeMapper recipeMapper = new RecipeMapper();
        ingredientRecipe.setRecipe(recipeMapper.mapRow(rs, rowNum));

        return ingredientRecipe;
    }
}
