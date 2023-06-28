package learn.agileaprons.data;

import learn.agileaprons.data.mappers.CuisineMapper;
import learn.agileaprons.data.mappers.IngredientMapper;
import learn.agileaprons.data.mappers.RecipeMapper;
import learn.agileaprons.models.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public Recipe findByName(String name) {
        return null;
    }

    @Override
    public Recipe add(Recipe recipe) {
        return null;
    }

    @Override
    public boolean update(Recipe recipe) {
        return false;
    }

    @Override
    public boolean deleteById(int id) {
        return false;
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
