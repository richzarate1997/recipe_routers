package learn.agileaprons.data.mappers;

import com.mysql.cj.jdbc.Blob;
import learn.agileaprons.models.Cuisine;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecipeMapper implements RowMapper<Recipe> {
    @Override
    public Recipe mapRow(ResultSet rs, int rowNum) throws SQLException {
        Recipe recipe = new Recipe();
        recipe.setId(rs.getInt("id"));
        recipe.setUserId(rs.getInt("user_app_user_id"));
        recipe.setTitle(rs.getString("title"));
        recipe.setInstructions(rs.getString("instructions"));
        recipe.setServings(rs.getInt("servings"));
        recipe.setCookMinutes(rs.getInt("cook_minutes"));
        recipe.setImageUrl(rs.getString("image_url"));
        recipe.setSourceUrl(rs.getString("src_url"));
        recipe.setImage(rs.getBytes("image"));
        recipe.setVegetarian(rs.getBoolean("vegetarian"));
        recipe.setVegan(rs.getBoolean("vegan"));
        recipe.setGlutenFree(rs.getBoolean("gluten_free"));
        recipe.setDairyFree(rs.getBoolean("dairy_free"));

        return recipe;
    }
}
