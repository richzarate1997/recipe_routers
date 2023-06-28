package learn.agileaprons.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import learn.agileaprons.models.AppUser;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class AppUserMapper implements RowMapper<AppUser> {
    private final List<String> roles;

    public AppUserMapper(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public AppUser mapRow(ResultSet rs, int i) throws SQLException {
        AppUser appUser = new AppUser(
                rs.getInt("app_user_id"),
                rs.getString("username"),
                rs.getString("password_hash"),
                rs.getBoolean("enabled"),
                roles);

        appUser.setDisplayName(rs.getString("display_name"));
        appUser.setMetric(rs.getBoolean("is_metric"));

        //FIXME: Implement mappers for myRecipes, myFavorites, & myLists

        return appUser;
    }
}