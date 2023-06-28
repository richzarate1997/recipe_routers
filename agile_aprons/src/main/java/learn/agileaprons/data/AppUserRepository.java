package learn.agileaprons.data;

import learn.agileaprons.models.AppUser;
public interface AppUserRepository {
    AppUser findByUsername(String username);
    AppUser create(AppUser user);
}
