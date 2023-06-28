package learn.agileaprons.data.mappers;

import learn.agileaprons.models.UserGroceryList;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserGroceryListMapper implements RowMapper<UserGroceryList> {
    @Override
    public UserGroceryList mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserGroceryList userGroceryList = new UserGroceryList();
        userGroceryList.setIngredientId(rs.getInt("ingredient_id"));

        UserMapper userMapper = new UserMapper();
        userGroceryList.setUser(userMapper.mapRow(rs, rowNum));

        GroceryListMapper groceryListMapper = new GroceryListMapper();
        userGroceryList.setGroceryList(groceryListMapper.mapRow(rs, rowNum));


        return userGroceryList;
    }
}
