package learn.agileaprons.data;

import learn.agileaprons.data.mappers.UnitMapper;
import learn.agileaprons.models.Unit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Repository
public class UnitJdbcTemplateRepository implements UnitRepository {

    private final JdbcTemplate jdbcTemplate;

    public UnitJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Unit> findAll() {
        final String sql = "select unit_id, unit_name, abbrev from unit;";
        return jdbcTemplate.query(sql, new UnitMapper());
    }

    @Override
    public Unit create(Unit u) {
        final String sql = "insert into unit (unit_name, abbrev) values (?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, u.getName());
            ps.setString(2, u.getAbbreviation());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) return null;

        u.setId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        return u;
    }
}
