package learn.agileaprons.data;

import learn.agileaprons.models.RecipeIngredient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RecipeIngredientJdbcTemplateRepository implements RecipeIngredientRepository{

    private final JdbcTemplate jdbcTemplate;

    public RecipeIngredientJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean create(RecipeIngredient recipeIngredient) {
        final String sql = "insert into recipe_ingredient (recipe_id, ingredient_id, unit_id, quantity) " +
                "values (?, ?, ?, ?);";
        return jdbcTemplate.update(sql,
                recipeIngredient.getRecipeId(),
                recipeIngredient.getIngredient().getId(),
                recipeIngredient.getUnit().getId(),
                recipeIngredient.getQuantity()) > 0;
    }

    @Override
    public boolean update(RecipeIngredient recipeIngredient) {
        final String sql = "update recipe_ingredient set " +
                "quantity = ?, " +
                "unit_id = ? " +
                "where recipe_id = ? and ingredient_id = ?;";

        return jdbcTemplate.update(sql,
                recipeIngredient.getQuantity(),
                recipeIngredient.getUnit().getId(),
                recipeIngredient.getRecipeId(),
                recipeIngredient.getIngredient().getId()) > 0;
    }

    @Override
    public boolean deleteByKey(int recipeId, int ingredientId) {
        final String sql = "delete from recipe_ingredient " +
                "where recipe_id = ? and ingredient_id = ?;";
        return jdbcTemplate.update(sql, recipeId, ingredientId) > 0;
    }

    @Override
    public boolean deleteByRecipe(int recipeId) {
        final String sql = "delete from recipe_ingredient " +
                "where recipe_id = ?;";
        return jdbcTemplate.update(sql, recipeId) > 0;
    }
}
