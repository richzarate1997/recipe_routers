package learn.agileaprons.data.mappers;

import learn.agileaprons.models.GroceryList;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GroceryListMapper implements RowMapper<GroceryList> {
    @Override
    public GroceryList mapRow(ResultSet rs, int rowNum) throws SQLException {
        GroceryList groceryList = new GroceryList();
        groceryList.setId(rs.getInt("grocery_list_id"));
        groceryList.setUserId(rs.getInt("user_app_user_id"));
        groceryList.setName(rs.getString("grocery_list_name"));

        return groceryList;
    }
}
