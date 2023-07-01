package learn.agileaprons.data;

import learn.agileaprons.models.Cuisine;
import learn.agileaprons.models.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
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
        assertTrue( pepperTacos.getIngredients().stream().anyMatch(i -> i.getIngredient().getName().equalsIgnoreCase("cheese")));
    }

    @Test
    void shouldFindPepperPizzaByName(){
        String testQuery = "Pepper Pizza";
        List<Recipe> result = repository.findByTitle(testQuery);
        assertEquals(1, result.size());
    }

    @Test
    void shouldFindRecipesWithPepperInTitle() {
        String testQuery = "Pepper";
        List<Recipe> result = repository.findByTitle(testQuery);
        assertEquals(3, result.size());
    }

    @Test
    void shouldCreate() {
        Recipe recipe = makeRecipe();
        Recipe actual = repository.create(recipe);
        assertNotNull(actual);
        assertEquals(3, actual.getId());
        assertEquals(1, actual.getCuisines().size());
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

    private Recipe makeRecipe() {
        Recipe recipe = new Recipe();
        recipe.setUserId(1);
        recipe.setTitle("Pepper Rice");
        recipe.setImageUrl("http://pepper-rice.jpg");
        recipe.setInstructions("put pepper and rice together.... maybe.... idk if this is even a thing");
        recipe.setServings(5);
        recipe.setSourceUrl("https://recipes.com/pepper-rice");
        recipe.setCookMinutes(1000);
        recipe.setVegan(true);
        recipe.setVegetarian(true);
        recipe.setImage(generateRandomBlob(10));

        Cuisine cuisine = new Cuisine();
        cuisine.setId(1);
        cuisine.setName("Italian");
        List<Cuisine> cuisines = new ArrayList<>();
        cuisines.add(cuisine);
        recipe.setCuisines(cuisines);

        return recipe;
    }

    public static byte[] generateRandomBlob(int size) {
        byte[] blob = new byte[size];
        new Random().nextBytes(blob);
        return blob;
    }

}