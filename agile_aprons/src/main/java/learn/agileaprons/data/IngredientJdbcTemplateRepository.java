package learn.agileaprons.data;

import learn.agileaprons.data.mappers.IngredientMapper;
import learn.agileaprons.models.Ingredient;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.stream.Collectors;

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
                "where id = ?";

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
        return null;
    }

    @Override
    public boolean update(Ingredient ingredient) {
        return false;
    }

    @Override
    public boolean deleteById(int id) {
        return false;
    }
}
