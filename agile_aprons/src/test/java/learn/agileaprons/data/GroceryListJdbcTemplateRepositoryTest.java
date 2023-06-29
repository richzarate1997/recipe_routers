package learn.agileaprons.data;

import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
class GroceryListJdbcTemplateRepositoryTest {

    @Autowired
    GroceryListJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindPepperTacosById() {
        GroceryList pepperTacos = repository.findById(2);
        assertEquals(2, pepperTacos.getId());
        assertEquals("Pepper Tacos", pepperTacos.getName());

    }
    @Test
    void shouldCreate() {
        GroceryList groceryList = new GroceryList();
        groceryList.setId(3);;
        groceryList.setName("My list");

        GroceryList actual = repository.create(groceryList);
        assertNotNull(actual);
        assertEquals(3, actual.getId());

    }

    @Test
    void shouldUpdate() {
        GroceryList groceryList = repository.findById(2);
        groceryList.setName("Pepper Pizza");

        assertTrue(repository.update(groceryList));
    }

    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(1));
    }


}