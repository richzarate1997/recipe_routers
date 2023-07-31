package learn.agileaprons.data;

import learn.agileaprons.data.mappers.CuisineMapper;
import learn.agileaprons.models.Cuisine;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

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

    @Override
    public Cuisine create(Cuisine c) {
        final String sql = "insert into cuisine (cuisine_name) values (?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, c.getName());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) return null;

        c.setId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        return c;
    }


}
