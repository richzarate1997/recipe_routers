package learn.agileaprons.data.mappers;

import learn.agileaprons.models.CuisineRecipe;
import learn.agileaprons.models.Recipe;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CuisineRecipeMapper implements RowMapper<CuisineRecipe> {
    @Override
    public CuisineRecipe mapRow(ResultSet rs, int rowNum) throws SQLException {
        CuisineRecipe cuisineRecipe = new CuisineRecipe();
        cuisineRecipe.setCuisineId(rs.getInt("cuisine_id"));

        RecipeMapper recipeMapper = new RecipeMapper();
        cuisineRecipe.setRecipe(recipeMapper.mapRow(rs, rowNum));


        return cuisineRecipe;
    }
}
