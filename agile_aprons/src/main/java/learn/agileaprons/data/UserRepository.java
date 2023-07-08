package learn.agileaprons.data;

import learn.agileaprons.models.User;
import learn.agileaprons.models.UserFavorite;

public interface UserRepository {
    User findById(int id);
    User create(User user);
    boolean update(User user);

    boolean isFavorite(UserFavorite userFavorite);
    void addFavorite(int userId, int recipeId);
    void deleteFavorite(int userId, int recipeId);
}
