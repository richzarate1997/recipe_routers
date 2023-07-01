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

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RecipeServiceTest {

    @MockBean
    RecipeRepository repository;

    @MockBean
    RecipeIngredientRepository ingredientRepository;

    @Autowired
    RecipeService service;


    @Test
    void shouldCreateRecipe() throws DataException {
        Recipe recipe = makeRecipe();
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.SUCCESS, actual.getResultType());
        System.out.println(actual.getPayload());
//        assertEquals("Italian", actual.getPayload().getCuisines().get(0));
    }

    @Test
    void shouldNotCreateWhenEmptyTitle() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setTitle("");
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    private Recipe makeRecipe(){
        Recipe recipe = new Recipe();
        recipe.setId(3);
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

        return recipe;
    }
}
