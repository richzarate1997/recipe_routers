package learn.agileaprons.data;

import learn.agileaprons.data.mappers.UnitMapper;
import learn.agileaprons.models.Unit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UnitJdbcTemplateRepository implements UnitRepository {

    private final JdbcTemplate jdbcTemplate;

    public UnitJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Unit> findAll() {
        final String sql = "select id, name unit_name, abbrev from unit;";
        return jdbcTemplate.query(sql, new UnitMapper());
    }
}
