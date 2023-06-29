package learn.agileaprons.data;

import learn.agileaprons.models.AppUser;
import learn.agileaprons.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserJdbcTemplateRepositoryTest {

     final static int NEXT_ID = 3;

    @Autowired
    UserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByAdmin() {
        User admin = repository.findById(1);
        assertEquals(1, admin.getId());
        assertEquals("ADMIN", admin.getDisplayName());
        assertTrue(admin.isMetric());
        assertEquals(1, admin.getMyRecipes().size());
        assertEquals(2, admin.getMyFavorites().size());
        assertEquals(2, admin.getMyLists().size());
    }

    @Test
    void shouldAdd() {
        User user = makeUser();
        User actual = repository.create(user);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getId());
    }

    @Test
    void shouldUpdate() {
        User user = makeUser();
        user.setId(2);
        assertTrue(repository.update(user));
        user.setId(10);
        assertFalse(repository.update(user));
    }


    private User makeUser() {
        User user = new User();
        user.setId(3);
        user.setDisplayName("Jim");
        user.setMetric(false);
        return user;
    }

}