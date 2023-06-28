package learn.agileaprons.data.mappers;

import learn.agileaprons.models.GroceryListIngredient;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GroceryListIngredientMapper implements RowMapper<GroceryListIngredient> {
    @Override
    public GroceryListIngredient mapRow(ResultSet rs, int rowNum) throws SQLException {
        GroceryListIngredient groceryListIngredient = new GroceryListIngredient();
        groceryListIngredient.setAppUserId(rs.getInt("user_app_user_id"));

        IngredientMapper ingredientMapper = new IngredientMapper();
        groceryListIngredient.setIngredient(ingredientMapper.mapRow(rs, rowNum));

        GroceryListMapper groceryListMapper = new GroceryListMapper();
        groceryListIngredient.setGroceryList(groceryListMapper.mapRow(rs, rowNum));


        return groceryListIngredient;
    }
}
