package learn.agileaprons.data.mappers;

import learn.agileaprons.models.RecipeCuisine;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecipeCuisineMapper implements RowMapper<RecipeCuisine> {
    @Override
    public RecipeCuisine mapRow(ResultSet rs, int rowNum) throws SQLException {
        RecipeCuisine recipeCuisine = new RecipeCuisine();
        recipeCuisine.setRecipeId(rs.getInt("recipe_id"));

        CuisineMapper cuisineMapper = new CuisineMapper();
        recipeCuisine.setCuisine(cuisineMapper.mapRow(rs, rowNum));
        return recipeCuisine;
    }
}
