package learn.agileaprons.data;

import learn.agileaprons.models.Cuisine;
import learn.agileaprons.models.Unit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CuisineJdbcTemplateRepositoryTest {

    @Autowired
    CuisineJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Cuisine> cuisines = repository.findAll();
        assertNotNull(cuisines);
        assertTrue(cuisines.size() == 2);
    }

}