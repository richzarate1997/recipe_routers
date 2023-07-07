package learn.agileaprons.data;

import learn.agileaprons.data.mappers.CuisineMapper;
import learn.agileaprons.models.Cuisine;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CuisineJdbcTemplateRepository implements CuisineRepository {

    private final JdbcTemplate jdbcTemplate;

    public CuisineJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Cuisine> findAll() {
        final String sql = "select cuisine_id, cuisine_name from cuisine;";
        return jdbcTemplate.query(sql, new CuisineMapper());
    }
}
