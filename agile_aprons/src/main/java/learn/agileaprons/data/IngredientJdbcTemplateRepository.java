package learn.agileaprons.data;

import learn.agileaprons.data.mappers.IngredientMapper;
import learn.agileaprons.models.Ingredient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;
@Repository
public class IngredientJdbcTemplateRepository implements IngredientRepository {
    private final JdbcTemplate jdbcTemplate;

    public IngredientJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Ingredient> findAll() {
        final String sql = "select i.id, i.name, i.image_url, i.aisle " +
                "from ingredient i;";

        return jdbcTemplate.query(sql, new IngredientMapper());
    }

    @Override
    public Ingredient findById(int id) {
        final String sql = "select i.id, i.name, i.image_url, i.aisle " +
                "from ingredient i " +
                "where i.id = ?";

        return jdbcTemplate.query(sql, new IngredientMapper(), id)
                .stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Ingredient> findByName(String name) {
        return findAll().stream()
                .filter(i -> i.getName().startsWith(name))
                .collect(Collectors.toList());

    }

    @Override
    public Ingredient create(Ingredient ingredient) {
        final String sql = "insert into ingredient (id, name, image_url, aisle) " +
                "values (?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, ingredient.getId());
            ps.setString(2, ingredient.getName());
            ps.setString(3, ingredient.getImageUrl());
            ps.setString(4, ingredient.getAisle());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        ingredient.setId(keyHolder.getKey().intValue());
        return ingredient;
    }

    @Override
    public boolean update(Ingredient ingredient) {
        final String sql = "update ingredient set "
                + "name = ?, "
                + "image_url = ?, "
                + "aisle = ? "
                + "where id = ?;";
        return jdbcTemplate.update(sql, ingredient.getName(), ingredient.getImageUrl(), ingredient.getAisle(),
                ingredient.getId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        jdbcTemplate.update("delete from recipe_ingredient where ingredient_id = ?;", id);
        jdbcTemplate.update("delete from grocery_list_ingredient where ingredient_id = ?;", id);
        final String sql = "delete from ingredient where id = ?;";
        return jdbcTemplate.update(sql, id) > 0;
    }
}
