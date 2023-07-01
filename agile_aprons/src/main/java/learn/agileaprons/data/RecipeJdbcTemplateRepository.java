package learn.agileaprons.data;

import learn.agileaprons.data.mappers.CuisineMapper;
import learn.agileaprons.data.mappers.RecipeIngredientMapper;
import learn.agileaprons.data.mappers.RecipeMapper;
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
import java.util.stream.Collectors;

@Repository
public class RecipeJdbcTemplateRepository implements RecipeRepository {

    private final JdbcTemplate jdbcTemplate;

    public RecipeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Recipe> findAll() {
        final String sql = "select r.id, r.title, r.instructions, r.servings, r.cook_minutes, r.image_url, r.vegetarian, "
                + "r.vegan, r.gluten_free, r.dairy_free, r.src_url, r.user_app_user_id, r.image "
                + "from recipe r;";

        return jdbcTemplate.query(sql, new RecipeMapper());
    }

    @Override
    @Transactional
    public Recipe findById(int id) {
        final String sql = "select r.id, r.title, r.instructions, r.servings, r.cook_minutes, r.image_url, r.vegetarian, "
                + "r.vegan, r.gluten_free, r.dairy_free, r.src_url, r.user_app_user_id, r.image "
                + "from recipe r "
                + "where id = ?;";
        Recipe recipe = jdbcTemplate.queryForObject(sql, new RecipeMapper(), id);
        if (recipe != null) {
            addIngredients(recipe);
            addCuisines(recipe);
        }
        return recipe;
    }

    @Override
    @Transactional
    public Recipe create(Recipe recipe) {
        final String sql = "insert into recipe (id, title, instructions, servings, cook_minutes, image_url, vegetarian, " +
                "vegan, gluten_free, dairy_free, src_url, user_app_user_id, image) " +
                "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, recipe.getId());
            ps.setString(2, recipe.getTitle());
            ps.setString(3, recipe.getInstructions());
            ps.setInt(4, recipe.getServings());
            ps.setInt(5, recipe.getCookMinutes());
            ps.setString(6, recipe.getImageUrl());
            ps.setBoolean(7, recipe.isVegetarian());
            ps.setBoolean(8, recipe.isVegan());
            ps.setBoolean(9, recipe.isGlutenFree());
            ps.setBoolean(10, recipe.isDairyFree());
            ps.setString(11, recipe.getSourceUrl());
            ps.setInt(12, recipe.getUserId());
            ps.setBytes(13, recipe.getImage()); //is this correct?
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        recipe.setId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        recipe.getCuisines().forEach(cuisine -> addRecipeCuisines(cuisine.getId(), recipe.getId()));
        return recipe;
    }

    @Override
    @Transactional
    public boolean update(Recipe recipe) {

        removeRecipeCuisines(recipe.getId());
        recipe.getCuisines().forEach(cuisine -> addRecipeCuisines(cuisine.getId(), recipe.getId()));

        final String sql = "update recipe set "
                + "title = ?, "
                + "instructions = ?, "
                + "servings = ?, "
                + "cook_minutes = ?, "
                + "image_url = ?, "
                + "vegetarian = ?, "
                + "vegan = ?, "
                + "gluten_free = ?, "
                + "dairy_free = ?, "
                + "src_url = ?, "
                + "user_app_user_id = ?, "
                + "image = ? "
                + "where id = ?;";


        return jdbcTemplate.update(sql,
                recipe.getTitle(),
                recipe.getInstructions(),
                recipe.getServings(),
                recipe.getCookMinutes(),
                recipe.getImageUrl(),
                recipe.isVegetarian(),
                recipe.isVegan(),
                recipe.isGlutenFree(),
                recipe.isDairyFree(),
                recipe.getSourceUrl(),
                recipe.getUserId(),
                recipe.getImage(),
                recipe.getId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        jdbcTemplate.update("delete from recipe_ingredient where recipe_id = ?;", id);
        removeRecipeCuisines(id);
        jdbcTemplate.update("delete from user_favorite where recipe_id = ?;", id);
        return jdbcTemplate.update("delete from recipe where id = ?;", id) > 0;

    }

    private void addIngredients(Recipe recipe) {
        final String sql = "select i.id, i.name, i.image_url, i.aisle, ri.recipe_id, ri.quantity, u.name unit_name, u.abbrev " +
                "from ingredient i " +
                "join recipe_ingredient ri on i.id = ri.ingredient_id " +
                "join recipe r on r.id = ri.recipe_id " +
                "join unit u on ri.unit_id = u.id " +
                "where r.id = ?;";
        var recipeIngredients = jdbcTemplate.query(sql, new RecipeIngredientMapper(), recipe.getId());
        recipe.setIngredients(recipeIngredients);
    }

    private void addCuisines(Recipe recipe) {
        final String sql = "select c.id, c.name " +
                "from cuisine c " +
                "join recipe_cuisine rc on c.id = rc.cuisine_id " +
                "join recipe r on r.id = rc.recipe_id " +
                "where r.id = ?;";

        var cuisines = jdbcTemplate.query(sql, new CuisineMapper(), recipe.getId());
        recipe.setCuisines(cuisines);
    }

    private void addRecipeCuisines(int cuisineId, int recipeId) {
        final String sql = "insert into recipe_cuisine (cuisine_id, recipe_id) " +
                "values (?, ?);";
        jdbcTemplate.update(sql, cuisineId, recipeId);
    }

    private void removeRecipeCuisines(int recipeId) {
        jdbcTemplate.update("delete from recipe_cuisine where recipe_id = ?;", recipeId);
    }
}
