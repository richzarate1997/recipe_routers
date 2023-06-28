package learn.agileaprons.data.mappers;

import learn.agileaprons.models.AppUserGroceryList;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AppUserGroceryListMapper implements RowMapper<AppUserGroceryList> {
    @Override
    public AppUserGroceryList mapRow(ResultSet rs, int rowNum) throws SQLException {
        AppUserGroceryList appUserGroceryList = new AppUserGroceryList();
        appUserGroceryList.setIngredientId(rs.getInt("ingredient_id"));


        return null;
    }
}
