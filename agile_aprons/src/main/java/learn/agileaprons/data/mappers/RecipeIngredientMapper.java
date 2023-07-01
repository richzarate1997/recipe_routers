package learn.agileaprons.data.mappers;

import learn.agileaprons.models.RecipeIngredient;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecipeIngredientMapper implements RowMapper<RecipeIngredient> {
    @Override
    public RecipeIngredient mapRow(ResultSet rs, int rowNum) throws SQLException {
        RecipeIngredient recipeIngredient = new RecipeIngredient();
        recipeIngredient.setRecipeId(rs.getInt("recipe_id"));
        recipeIngredient.setQuantity(rs.getDouble("quantity"));

        UnitMapper unitMapper = new UnitMapper();
        recipeIngredient.setUnit(unitMapper.mapRow(rs, rowNum));

        IngredientMapper ingredientMapper = new IngredientMapper();
        recipeIngredient.setIngredient(ingredientMapper.mapRow(rs, rowNum));

        return recipeIngredient;
    }
}
