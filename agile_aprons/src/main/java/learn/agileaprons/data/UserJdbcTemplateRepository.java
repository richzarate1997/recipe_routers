package learn.agileaprons.data;

import learn.agileaprons.data.mappers.RecipeMapper;
import learn.agileaprons.data.mappers.UserMapper;
import learn.agileaprons.models.Recipe;
import learn.agileaprons.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;


    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public User findById(int id) {

        final String sql = "select id, display_name, is_metric " +
                "from user" +
                "where id = ?;";

        User user = jdbcTemplate.query(sql, new UserMapper(), id).stream()
                .findFirst().orElse(null);

        if (user != null) {
            addRecipes(user);
            addFavorites(user);
            addLists(user);
        }

        return user;
    }

    @Override
    public User create(User user) {
        return null;
    }

    @Override
    public User update(User user) {
        return null;
    }

    private void addRecipes(User user) {

        final String sql = "select r.id, r.user_app_user_id, r.title, r.instructions, r.servings, " +
                "r.cookMinutes, r.imageUrl, r.sourceUrl, r.image, r.vegetarian, r.vegan, " +
                "r.glutenFree, r.dairyFree " +
                "from recipe r " +
                "join user u on r.user_app_user_id = u.app_user_id " +
                "where r.user_app_user_id = ?;";

        var userRecipes = jdbcTemplate.query(sql, new RecipeMapper(), user.getId());
        user.setMyRecipes(userRecipes);
    }

    private void addFavorites(User user) {

        final String sql = "select r.id, r.user_app_user_id, r.title, r.instructions, r.servings, " +
                "r.cookMinutes, r.imageUrl, r.sourceUrl, r.image, r.vegetarian, r.vegan, " +
                "r.glutenFree, r.dairyFree " +
                "from recipe r " +
                "join user_favorite uf on r.id = uf.recipe_id " +
                "join user u on uf.user_app_user_id = u.app_user_id" +
                "where u.app_user_id = ?;";

        var userFavorites = jdbcTemplate.query(sql, new RecipeMapper(), user.getId());
        user.setMyFavorites(userFavorites);
    }

    private void addLists(User user) {
        
    }


}
