package learn.agileaprons.data;

import learn.agileaprons.data.mappers.CuisineMapper;
import learn.agileaprons.data.mappers.IngredientMapper;
import learn.agileaprons.data.mappers.RecipeMapper;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;

public class RecipeJdbcTemplateRepository implements RecipeRepository {

    private final JdbcTemplate jdbcTemplate;

    public RecipeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Recipe> findAll() {
        final String sql = "select r.id, r.title, r.instructions, r.servings, r.cook_minutes, r.image_url, r.vegetarian, "
                + "r.vegan, r.gluten_free, r.dairy_free, r.src_url, r.user_app_user_id, r.image"
                + "from recipe r;";

        return jdbcTemplate.query(sql, new RecipeMapper());
    }

    @Override
    @Transactional
    public Recipe findById(int id) {
        final String sql = "select r.id, r.title, r.instructions, r.servings, r.cook_minutes, r.image_url, r.vegetarian, "
                + "r.vegan, r.gluten_free, r.dairy_free, r.src_url, r.user_app_user_id, r.image"
                + "from recipe r"
                + "where id = ?;";
        Recipe recipe = jdbcTemplate.query(sql, new RecipeMapper(), id).stream()
                .findFirst().orElse(null);
        if(recipe != null){
            addIngredients(recipe);
            addCuisines(recipe);
        }
        return recipe;
    }

    @Override
    public List<Recipe> findByTitle(String title) {
        return findAll().stream()
                .filter(i -> i.getTitle().startsWith(title))
                .collect(Collectors.toList());
    }

    @Override
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
            ps.setInt(12, recipe.getUserId()); //is this correct? or is it recipe.User,getId
            ps.setBlob(13, recipe.getImage()); //is this correct?
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        recipe.setId(keyHolder.getKey().intValue());
        return recipe;
    }

    @Override
    public boolean update(Recipe recipe) {
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
                + "image = ?, "
                + "where id = ?;";


        return jdbcTemplate.update(sql, recipe.getTitle(), recipe.getInstructions(), recipe.getServings(),recipe.getCookMinutes(),
                recipe.getImageUrl(), recipe.isVegetarian(), recipe.isVegan(), recipe.isGlutenFree(), recipe.isDairyFree(),
                recipe.getSourceUrl(), recipe.getUserId(), recipe.getImage(), recipe.getId()) > 0;
    }

    @Override
    public boolean deleteById(int id) {
        final String sql = "delete from recipe where id = ?;";
        return jdbcTemplate.update(sql, id) > 0;

    }

    private void addIngredients(Recipe recipe){
        final String sql = "select i.id, i.name, i.image_url, i.aisle " +
                "from ingredient i " +
                "join recipe_ingredient ri on i.id = ri.ingredient_id " +
                "join recipe r on r.id = ri.recipe_id where r.id = ?;";
        var ingredients = jdbcTemplate.query(sql, new IngredientMapper(), recipe.getId());
        recipe.setIngredients(ingredients);
    }

    private void addCuisines(Recipe recipe){
        final String sql = "select c.id, c.name " +
                "from cuisine c " +
                "join recipe_cuisine rc on c.id = rc.cuisine_id " +
                "join recipe r on r.id = rc.recipe_id " +
                "where r.id = ?;";

        var cuisines = jdbcTemplate.query(sql, new CuisineMapper(), recipe.getId());
        recipe.setCuisines(cuisines);
    }
}
