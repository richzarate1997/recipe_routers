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
import java.util.List;
import java.util.Objects;

@Repository
public class GroceryListJdbcTemplateRepository implements GroceryListRepository{

    private final JdbcTemplate jdbcTemplate;

    public GroceryListJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<GroceryList> findAll() {
        final String sql = "select gi.id, gi.user_app_user_id, gi.name "
                + "from grocery_list;";
        return jdbcTemplate.query(sql, new GroceryListMapper());
    }

    @Override
    public GroceryList findById(int id) {
        final String sql = "select id, user_app_user_id, name "
                + "from grocery_list "
                + " where id = ?;";
        GroceryList result =  jdbcTemplate.queryForObject(sql, new GroceryListMapper(), id);
        if (result != null){
            addIngredients(result);
        }
        return result;
    }

    @Override
    @Transactional
    public GroceryList create(GroceryList groceryList) {
        final String sql = "insert into grocery_list (user_app_user_id, name)" +
                "values (?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, groceryList.getUserId());
            ps.setString(2, groceryList.getName());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        addGroceryListIngredients(groceryList);
        groceryList.setId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        return groceryList;
    }

    @Override
    @Transactional
    public boolean update(GroceryList groceryList) {
        final String sql = "update grocery_list set " +
                "name = ? " +
                "where id = ?;";

        removeGroceryListIngredients(groceryList.getId());
        addGroceryListIngredients(groceryList);
        return jdbcTemplate.update(sql, groceryList.getName(), groceryList.getId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        removeGroceryListIngredients(id);
        return jdbcTemplate.update("delete from grocery_list where id = ?;", id) > 0;
    }

    private void addIngredients(GroceryList groceryList){
        final String sql = "select i.id, i.name, i.aisle, i.image_url " +
                "from ingredient i " +
                "join grocery_list_ingredient gli on i.id = gli.ingredient_id " +
                "join grocery_list gl on gl.id = gli.grocery_list_id " +
                "where gl.id = ?;";
        var ingredients = jdbcTemplate.query(sql, new IngredientMapper(), groceryList.getId());
        groceryList.setList(ingredients);
    }

    @Transactional
    private void addGroceryListIngredients(GroceryList groceryList) {
        final String sql = "insert into grocery_list_ingredient (ingredient_id, grocery_list_id) values (?, ?);";
        groceryList.getList().forEach(ingredient -> jdbcTemplate.update(sql, ingredient.getId(), groceryList.getId()));
    }

    private void removeGroceryListIngredients(int id) {
        jdbcTemplate.update("delete from grocery_list_ingredient where grocery_list_id = ?", id);
    }
}
