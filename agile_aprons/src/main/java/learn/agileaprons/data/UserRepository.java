package learn.agileaprons.data;

import learn.agileaprons.models.User;

import java.util.List;

public interface UserRepository {
    User findById(int id);
    User create(User user);
}
