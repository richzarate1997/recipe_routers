package learn.agileaprons.domain;

import learn.agileaprons.data.UserRepository;
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


}
