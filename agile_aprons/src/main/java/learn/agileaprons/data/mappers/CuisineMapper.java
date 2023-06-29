package learn.agileaprons.data.mappers;

import learn.agileaprons.models.Cuisine;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CuisineMapper implements RowMapper<Cuisine> {
    @Override
    public Cuisine mapRow(ResultSet rs, int rowNum) throws SQLException {
        Cuisine cuisine = new Cuisine();
        cuisine.setId(rs.getInt("id"));
        cuisine.setName(rs.getString("name"));
        return cuisine;
    }
}
