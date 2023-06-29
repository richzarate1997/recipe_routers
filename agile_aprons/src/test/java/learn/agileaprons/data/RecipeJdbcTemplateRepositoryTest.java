package learn.agileaprons.data;

import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class RecipeJdbcTemplateRepositoryTest {

    @Autowired
    RecipeJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Recipe> recipes = repository.findAll();
        assertNotNull(recipes);
        assertTrue(recipes.size() >= 2);

    }
    @Test
    void shouldFindPepperTacosById() {
        Recipe pepperTacos = repository.findById(2);
        assertEquals(2, pepperTacos.getId());
        assertEquals("Pepper Tacos", pepperTacos.getTitle());

    }

    @Test
    void shouldFindPepperPizzaByName(){
        String testName = "Pepper Pizza";
        List<Recipe> result = repository.findByTitle(testName);
        assertEquals(1, result.size());
    }

    @Test
    void shouldCreate() {
        Recipe recipe = new Recipe();
        recipe.setId(3);
        recipe.setUserId(1);
        recipe.setTitle("Pepper Rice");
        recipe.setImageUrl("http://pepper-rice.jpg");
        recipe.setInstructions("put pepper and rice together.... maybe.... idk if this is even a thing");
        recipe.setServings(5);
        recipe.setSourceUrl("https://recipes.com/pepper-rice");
        recipe.setCookMinutes(1000);

        Recipe actual = repository.create(recipe);
        assertNotNull(actual);
        assertEquals(3, actual.getId());

    }
    @Test
    void shouldUpdate() {

        Recipe recipe = repository.findById(2);
        recipe.setInstructions("Mix ingredients together and toss in oven at 400 for 25 minutes");

        assertTrue(repository.update(recipe));

    }
    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(1));
    }



}