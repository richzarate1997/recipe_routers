package learn.agileaprons.security;

import learn.agileaprons.data.AppUserRepository;
import learn.agileaprons.domain.Result;
import learn.agileaprons.models.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import learn.agileaprons.domain.ResultType;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null) {
            throw new UsernameNotFoundException(username + " not found.");
        }

        return appUser;
    }

    public Result<AppUser> create(Credentials credentials) {
        Result<AppUser> result = validate(credentials);
        if (!result.isSuccess()) {
            return result;
        }

        String hashedPassword = encoder.encode(credentials.getPassword());

        AppUser appUser = new AppUser(0, credentials.getUsername(),
                hashedPassword, true, List.of("USER"));

        try {
            appUser = repository.create(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException e) {
            result.addMessage("The provided username already exists", ResultType.INVALID);
        }

        return result;
    }

    private Result<AppUser> validate(Credentials credentials) {
        Result<AppUser> result = new Result<>();
        if (credentials.getUsername() == null || credentials.getUsername().isBlank()) {
            result.addMessage("username is required");
            return result;
        }

        if (credentials.getPassword() == null) {
            result.addMessage("password is required");
            return result;
        }

        if (credentials.getUsername().length() > 50) {
            result.addMessage("username must be less than 50 characters");
        }

        if (!isValidPassword(credentials.getPassword())) {
            result.addMessage(
                    "password must be at least 8 character and contain a digit," +
                            " a letter, and a non-digit/non-letter");
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}
