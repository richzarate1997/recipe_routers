package learn.agileaprons.data.mappers;

import learn.agileaprons.models.Ingredient;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class IngredientMapper implements RowMapper<Ingredient> {
    @Override
    public Ingredient mapRow(ResultSet rs, int rowNum) throws SQLException {
        Ingredient ingredient = new Ingredient();
        ingredient.setId(rs.getInt("id"));
        ingredient.setName(rs.getString("name"));
        ingredient.setImageUrl(rs.getString("image_url"));
        ingredient.setAisle(rs.getString("aisle"));


        return ingredient;
    }
}
