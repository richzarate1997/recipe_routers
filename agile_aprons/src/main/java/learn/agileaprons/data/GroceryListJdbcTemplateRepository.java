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
        final String sql = "select grocery_list_id, user_app_user_id, grocery_list_name "
                + "from grocery_list;";
        return jdbcTemplate.query(sql, new GroceryListMapper());
    }

    @Override
    @Transactional
    public GroceryList findById(int id) {
        final String sql = "select grocery_list_id, user_app_user_id, grocery_list_name "
                + "from grocery_list "
                + "where grocery_list_id = ?;";
        GroceryList result = jdbcTemplate.queryForObject(sql, new GroceryListMapper(), id);
        if (result != null){
            addIngredients(result);
        }
        return result;
    }

    @Override
    @Transactional
    public GroceryList findByName(String name, int userId) {
        final String sql = "select grocery_list_id, user_app_user_id, grocery_list_name "
                + "from grocery_list "
                + " where grocery_list_name = ? and user_app_user_id = ?;";
        GroceryList result = jdbcTemplate.queryForObject(sql, new GroceryListMapper(), name, userId);
        if (result != null){
            addIngredients(result);
        }
        return result;
    }

    @Override
    @Transactional
    public GroceryList create(GroceryList groceryList) {
        final String sql = "insert into grocery_list (user_app_user_id, grocery_list_name)" +
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

        groceryList.setId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        addGroceryListIngredients(groceryList);
        return groceryList;
    }

    @Override
    @Transactional
    public boolean update(GroceryList groceryList) {
        final String sql = "update grocery_list set " +
                "grocery_list_name = ? " +
                "where grocery_list_id = ?;";

        removeGroceryListIngredients(groceryList.getId());
        addGroceryListIngredients(groceryList);
        return jdbcTemplate.update(sql, groceryList.getName(), groceryList.getId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        removeGroceryListIngredients(id);
        return jdbcTemplate.update("delete from grocery_list where grocery_list_id = ?;", id) > 0;
    }

    private void addIngredients(GroceryList groceryList){
        final String sql = "select i.ingredient_id, i.ingredient_name, i.aisle, i.image_url " +
                "from ingredient i " +
                "join grocery_list_ingredient gli on i.ingredient_id = gli.ingredient_id " +
                "join grocery_list gl on gl.grocery_list_id = gli.grocery_list_id " +
                "where gl.grocery_list_id = ?;";
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
