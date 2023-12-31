package learn.agileaprons.data.mappers;

import learn.agileaprons.models.Unit;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UnitMapper implements RowMapper<Unit> {
    @Override
    public Unit mapRow(ResultSet rs, int rowNum) throws SQLException {
        Unit unit = new Unit();
        unit.setId(rs.getInt("unit_id"));
        unit.setName(rs.getString("unit_name"));
        unit.setAbbreviation(rs.getString("abbrev"));
        return unit;
    }
}
