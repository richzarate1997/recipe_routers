package learn.agileaprons.data;

import learn.agileaprons.data.mappers.GroceryListMapper;
import learn.agileaprons.data.mappers.IngredientMapper;
import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class GroceryListJdbcTemplateRepository implements GroceryListRepository{

    private final JdbcTemplate jdbcTemplate;

    public GroceryListJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public GroceryList findById(int id) {
        final String sql = "Select gi.id, gi.name "
                + "from grocery_list gi"
                + " where id = ?;";
        GroceryList result =  jdbcTemplate.query(sql, new GroceryListMapper(), id).stream()
                .findFirst()
                .orElse(null);
        if (result != null){
            addIngredients(result);
        }
        return result;
    }

    @Override
    public GroceryList create(GroceryList groceryList) {
        final String sql = "insert into grocery_list (id, name)" +
                "values (?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, groceryList.getId());
            ps.setString(2, groceryList.getName());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }
        groceryList.setId(keyHolder.getKey().intValue());
        return groceryList;
    }

    @Override
    public boolean update(GroceryList groceryList) {
        final String sql = "Update grocery_list set " +
                "name = ? " +
                "where id = ?;";

        return jdbcTemplate.update(sql, groceryList.getName(), groceryList.getId()) > 0;
    }
    @Transactional
    @Override
    public boolean deleteById(int id) {
        jdbcTemplate.update("delete from grocery_list_ingredient where list_id = ?;",id);

        return jdbcTemplate.update(
                "delete from grocery_list where id = ?", id) > 0;
    }

    private void addIngredients(GroceryList groceryList){
        final String sql = "select i.id, i.name, i.aisle, i.image_url " +
                "from ingredient i " +
                "join grocery_list_ingredient gli on i.id = gli.ingredient_id " +
                "join grocery_list gl on gl.id = gli.list_id " +
                "where gl.id = ?;";
        var ingredients = jdbcTemplate.query(sql, new IngredientMapper(), groceryList.getId());
        groceryList.setList(ingredients);
    }
}
