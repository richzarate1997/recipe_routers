package learn.agileaprons.data;

import learn.agileaprons.models.User;

public interface UserRepository {
    User findById(int id);
    User create(User user);
    boolean update(User user);

    void addFavorite(int userId, int recipeId);
    void deleteFavorite(int userId, int recipeId);
}
