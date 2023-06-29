package learn.agileaprons.data;

import learn.agileaprons.models.User;

public interface UserRepository {
    User findById(int id);
    User create(User user);
    User update(User user);
}
