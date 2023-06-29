package learn.agileaprons.data;

import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.RecipeIngredient;
import learn.agileaprons.models.Unit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RecipeIngredientJdbcTemplateRepositoryTest {

    @Autowired
    RecipeIngredientJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        RecipeIngredient recipeIngredient = makeRecipeIngredient();
        assertTrue(repository.create(recipeIngredient));

        try {
            repository.create(recipeIngredient); // must fail
            fail("Cannot add recipe ingredient to a recipe twice.");
        } catch (DataAccessException ex) {
            //this is expected.
        }
    }

    @Test
    void shouldUpdate() {
        RecipeIngredient recipeIngredient = makeRecipeIngredient();
//        recipeIngredient.getIngredient().setId(5);
        recipeIngredient.setQuantity(5);
        assertTrue(repository.update(recipeIngredient));

        recipeIngredient.setRecipeId(12);
        assertFalse(repository.update(recipeIngredient));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteByKey(1,4));
        assertFalse(repository.deleteByKey(1,4));
    }

    private RecipeIngredient makeRecipeIngredient() {
        RecipeIngredient recipeIngredient = new RecipeIngredient();
        recipeIngredient.setRecipeId(1);
        recipeIngredient.setQuantity(3);

        Unit unit = new Unit();
        unit.setId(10);
        unit.setName("count");
        unit.setAbbreviation("ct");
        recipeIngredient.setUnit(unit);

        Ingredient ingredient = new Ingredient();
        ingredient.setId(5);
        ingredient.setName("Corn Tortilla");
        ingredient.setImageUrl("http://bread.com/bread.jpg");
        recipeIngredient.setIngredient(ingredient);

        return recipeIngredient;
    }

}