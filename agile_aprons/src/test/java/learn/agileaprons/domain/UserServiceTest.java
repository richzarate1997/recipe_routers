package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.UserRepository;
import learn.agileaprons.models.Recipe;
import learn.agileaprons.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {
    @MockBean
    UserRepository repository;
    @Autowired
    UserService service;

    @Test
    void shouldFindUserById() {
        User user = makeUser();
        user.setId(1);

        when(repository.findById(1)).thenReturn(user);
        User actual = service.findById(1);
        assertEquals(user, actual);
    }

    @Test
    void shouldCreateUser() throws DataException {
        User user = makeUser();
        User expectedUser = makeUser();
        expectedUser.setId(3);

        when(repository.create(user)).thenReturn(expectedUser);
        Result<User> actual = service.create(user);
        assertTrue(actual.isSuccess());
        assertNotNull(actual.getPayload());
        assertEquals(expectedUser, actual.getPayload());
    }

    private User makeUser(){
        User user = new User();
        user.setDisplayName("Jim");
        user.setMetric(false);
        return user;
    }
}
