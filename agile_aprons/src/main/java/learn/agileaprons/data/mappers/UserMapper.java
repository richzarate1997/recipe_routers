package learn.agileaprons.data.mappers;

import learn.agileaprons.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("app_user_id"));
        user.setDisplayName(rs.getString("display_name"));
        user.setMetric(rs.getBoolean("metric"));
        return user;
    }
}
