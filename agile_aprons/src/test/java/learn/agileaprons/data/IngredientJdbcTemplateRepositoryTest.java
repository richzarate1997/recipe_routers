package learn.agileaprons.data;

import learn.agileaprons.models.Ingredient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class IngredientJdbcTemplateRepositoryTest {

    @Autowired
    IngredientJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll(){
        List<Ingredient> ingredients = repository.findAll();
        assertNotNull(ingredients);
        assertTrue(ingredients.size() >= 4);
    }

    @Test
    void shouldFindCheese(){
        Ingredient cheese = repository.findById(1);
        assertEquals(1, cheese.getId());
        assertEquals("Cheese", cheese.getName());
    }

    @Test
    void shouldFindCheeseAndCornTortillas(){
        String testName = "C";
        List<Ingredient> result = repository.findByName(testName);
        assertEquals(2, result.size());

    }
    @Test
    void shouldCreate() {
        Ingredient ingredient = new Ingredient();
        ingredient.setName("Pepperoni");
        ingredient.setImageUrl("fake.png");
        ingredient.setAisle("Deli");
        Ingredient actual = repository.create(ingredient);
        assertNotNull(actual);
        assertEquals(6, actual.getId());

    }
    @Test
    void shouldUpdate() {
        Ingredient ingredient = repository.findById(3);
        ingredient.setName("Tomatoe");

        assertTrue(repository.update(ingredient));

    }
    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(2));

    }


}