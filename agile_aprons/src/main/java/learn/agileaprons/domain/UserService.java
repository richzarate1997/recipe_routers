package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.UserRepository;
import learn.agileaprons.models.User;
import learn.agileaprons.models.UserFavorite;
import org.springframework.stereotype.Service;

import javax.validation.Validator;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final Validator validator;

    public UserService(UserRepository userRepository, Validator validator) {
        this.userRepository = userRepository;
        this.validator = validator;
    }
    public User findById(int id) {
        return userRepository.findById(id);
    }

    public Result<User> create(User user) throws DataException {
        Result<User> result = validate(user);

        if (!result.isSuccess()) {
            return result;
        }

        user = userRepository.create(user);
        result.setPayload(user);
        return result;
    }

    public Result<User> update(User user) throws DataException {
        Result<User> result = validate(user);

        if (!result.isSuccess()) {
            return result;
        }

        if (!userRepository.update(user)) {
            result.addMessage("User doesn't exist.", ResultType.NOT_FOUND);
        }

        return result;
    }


    public boolean isFavorite(UserFavorite userFavorite) {
        return userRepository.isFavorite(userFavorite);
    }

    // Favorite methods without result feedback
    public void addFavorite(int userId, int recipeId) {
        userRepository.addFavorite(userId, recipeId);
    }
    public void removeFavorite(int userId, int recipeId) {
        userRepository.deleteFavorite(userId, recipeId);
    }


    private Result<User> validate(User user) {
        Result<User> result = new Result<>();

        if (user == null) {
            result.addMessage("User cannot be null.");
            return result;
        }

        for (var violation: validator.validate(user)) {
            result.addMessage(violation.getMessage());
        }

        return result;
    }


}
