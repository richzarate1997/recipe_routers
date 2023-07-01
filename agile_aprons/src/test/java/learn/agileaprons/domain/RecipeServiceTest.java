package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.RecipeIngredientRepository;
import learn.agileaprons.data.RecipeRepository;
import learn.agileaprons.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class RecipeServiceTest {

    @MockBean
    RecipeRepository repository;

    @MockBean
    RecipeIngredientRepository ingredientRepository;

    @Autowired
    RecipeService service;

    @Test
    void shouldFindRecipeById() {
        Recipe recipe = makeRecipe();
        recipe.setId(1);

        when(repository.findById(1)).thenReturn(recipe);

        Recipe actual = service.findById(1);

        assertEquals(recipe, actual);
    }

    @Test
    void shouldCreateRecipe() throws DataException {
        Recipe recipe = makeRecipe();
        Recipe expectedRecipe = makeRecipe();
        expectedRecipe.setId(3);

        when(repository.create(recipe)).thenReturn(expectedRecipe);
        Result<Recipe> actual = service.create(recipe);
        assertTrue(actual.isSuccess());
        assertNotNull(actual.getPayload());
        assertEquals(expectedRecipe, actual.getPayload());
        assertEquals("Italian", actual.getPayload().getCuisines().get(0).getName());
    }

    @Test
    void shouldNotCreateNullRecipe() throws DataException {
        Result<Recipe> actual = service.create(null);
        assertFalse(actual.isSuccess());
        assertEquals("Recipe cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenEmptyTitle() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setTitle("");
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWhenNullTitle() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setTitle(null);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWithNonZeroUserId() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setUserId(20);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWhenEmptyTitle() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setTitle("");
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWhenNullTitle() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setTitle(null);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }





//    @Test
//    void shouldNotCreateExistingRecipe() {
//
//    }

    @Test
    void shouldUpdateExistingRecipe() throws DataException {
        Recipe toUpdate = new Recipe();
        toUpdate.setId(2);
        toUpdate.setUserId(1);
        toUpdate.setTitle("Pepper Tacos");
        toUpdate.setImageUrl("");
        toUpdate.setImage(generateRandomBlob(13));
        toUpdate.setInstructions("Layer cheese, tomatoes, and peppers, into warmed tortillas. Enjoy!");
        toUpdate.setServings(8);
        toUpdate.setSourceUrl("https://yum.com/tacos/with/peppers");
        toUpdate.setCookMinutes(54);

        RecipeIngredient ingredient = new RecipeIngredient();
        ingredient.setQuantity(10);
        Ingredient ing = new Ingredient();
        ing.setId(4);
        ingredient.setIngredient(ing);
        Unit unit = new Unit();
        unit.setId(1);
        ingredient.setUnit(unit);
        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(ingredient);
        toUpdate.setIngredients(ingredients);

        when(repository.update(toUpdate)).thenReturn(true);

        Result<Recipe> actual = service.update(toUpdate);
        assertTrue(actual.isSuccess());
        assertEquals(0, actual.getMessages().size());
    }

    @Test
    void shouldNotUpdateNullRecipe() throws DataException {
        Result<Recipe> actual = service.update(null);
        assertFalse(actual.isSuccess());
        assertEquals(1, actual.getMessages().size());
        assertEquals("Recipe cannot be null.", actual.getMessages().get(0));
    }

    private Recipe makeRecipe(){
        Recipe recipe = new Recipe();
        recipe.setUserId(1);
        recipe.setTitle("Pepper Rice");
        recipe.setImageUrl("http://pepper-rice.jpg");
        recipe.setInstructions("put pepper and rice together.... maybe.... idk if this is even a thing");
        recipe.setServings(5);
        recipe.setSourceUrl("https://recipes.com/pepper-rice");
        recipe.setCookMinutes(1000);

        RecipeIngredient ingredient = new RecipeIngredient();

        ingredient.setQuantity(10);

        Ingredient ing = new Ingredient();
        ing.setId(4);
        ingredient.setIngredient(ing);

        Unit unit = new Unit();
        unit.setId(1);
        ingredient.setUnit(unit);

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(ingredient);
        recipe.setIngredients(ingredients);

        Cuisine cuisine = new Cuisine();
        cuisine.setId(1);
        cuisine.setName("Italian");

        List<Cuisine> cuisines = new ArrayList<>();
        cuisines.add(cuisine);
        recipe.setCuisines(cuisines);
        recipe.setImage(generateRandomBlob(10));

        return recipe;
    }

    public static byte[] generateRandomBlob(int size) {
        byte[] blob = new byte[size];
        new Random().nextBytes(blob);
        return blob;
    }
}
