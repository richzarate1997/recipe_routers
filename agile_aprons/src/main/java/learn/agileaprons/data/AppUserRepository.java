package learn.agileaprons.data;


public interface AppUserRepository {
    learn.agileaprons.security.AppUser findByUsername(String username);
    learn.agileaprons.security.AppUser create(learn.agileaprons.security.AppUser user);
}
