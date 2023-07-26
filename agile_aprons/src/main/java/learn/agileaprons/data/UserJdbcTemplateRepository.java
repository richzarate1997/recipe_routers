package learn.agileaprons.data;

import learn.agileaprons.data.mappers.GroceryListMapper;
import learn.agileaprons.data.mappers.RecipeMapper;
import learn.agileaprons.data.mappers.UserMapper;
import learn.agileaprons.models.User;
import learn.agileaprons.models.UserFavorite;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.sql.PreparedStatement;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;


    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public User findById(int id) {

        final String sql = "select app_user_id, display_name, is_metric " +
                "from user " +
                "where app_user_id = ?;";

        User user = jdbcTemplate.queryForObject(sql, new UserMapper(), id);

        if (user != null) {
            addRecipes(user);
            addFavorites(user);
            addLists(user);
        }

        return user;
    }

    @Override
    public User create(User user) {

        final String sql = "insert into user (app_user_id, display_name, is_metric) " +
                "values (?, ?, ?);";

        int rowsAffected = jdbcTemplate.update(sql,
            user.getId(),
            user.getDisplayName(),
            user.isMetric());

        return rowsAffected <= 0 ? null : user;
    }

    @Override
    public boolean update(User user) {

        final String sql = "update user set " +
                "display_name = ?, " +
                "is_metric = ? " +
                "where app_user_id = ?;";

        return jdbcTemplate.update(sql,
                user.getDisplayName(),
                user.isMetric(),
                user.getId()) > 0;
    }

    @Override
    public boolean isFavorite(UserFavorite userFavorite) {
        final String sql = "select count(*) from user_favorite where recipe_id = ? and user_app_user_id = ?;";
        return jdbcTemplate.queryForObject(sql, Integer.class, userFavorite.getRecipeId(), userFavorite.getUserId()) == 1;
    }

    // Favorite methods without result feedback
    @Override
    public void addFavorite(int userId, int recipeId) {
        final String sql = "insert into user_favorite (user_app_user_id, recipe_id) " +
                "values (?, ?);";
        jdbcTemplate.update(sql, userId, recipeId);
    }

    @Override
    public void deleteFavorite(int userId, int recipeId) {
        final String sql = "delete from user_favorite " +
                " where user_app_user_id = ? and recipe_id = ?;";
        jdbcTemplate.update(sql, userId, recipeId);
    }

    private void addRecipes(User user) {

        final String sql = "select r.id, r.user_app_user_id, r.title, r.instructions, r.servings, " +
                "r.cook_minutes, r.image_url, r.src_url, r.image, r.vegetarian, r.vegan, " +
                "r.gluten_free, r.dairy_free " +
                "from recipe r " +
                "join user u on r.user_app_user_id = u.app_user_id " +
                "where r.user_app_user_id = ?;";

        var userRecipes = jdbcTemplate.query(sql, new RecipeMapper(), user.getId());
        user.setMyRecipes(userRecipes);
    }

    private void addFavorites(User user) {

        final String sql = "select r.id, r.user_app_user_id, r.title, r.instructions, r.servings, " +
                "r.cook_minutes, r.image_url, r.src_url, r.image, r.vegetarian, r.vegan, " +
                "r.gluten_free, r.dairy_free " +
                "from recipe r " +
                "join user_favorite uf on r.id = uf.recipe_id " +
                "join user u on uf.user_app_user_id = u.app_user_id " +
                "where u.app_user_id = ?;";

        var userFavorites = jdbcTemplate.query(sql, new RecipeMapper(), user.getId());
        user.setMyFavorites(userFavorites);
    }

    private void addLists(User user) {

        final String sql = "select gl.id grocery_list_id, gl.user_app_user_id, gl.name grocery_list_name from grocery_list gl " +
                "join user u on gl.user_app_user_id = u.app_user_id " +
                "where u.app_user_id = ?;";

        var userLists = jdbcTemplate.query(sql, new GroceryListMapper(), user.getId());
        user.setMyLists(userLists);
    }


}
