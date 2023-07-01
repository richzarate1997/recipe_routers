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
    void shouldNotCreateWithExistingRecipe() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setId(3);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertTrue(actual.getMessages().get(0).contains("existing"));
    }

    @Test
    void shouldNotCreateWhenInstructionsNullOrBlank() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setInstructions("");
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());

        recipe.setInstructions(null);
        actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe instructions cannot be blank.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenInstructionsOver1000Chars() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setInstructions(lorem());
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe instructions must be 1000 characters or less.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenServingsLessThan1() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setServings(0);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe servings cannot be less than 1.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenServingsMoreThan50() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setServings(51);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe servings cannot be greater than 50.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenCookMinutesLessThan1() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setCookMinutes(0);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe cook time cannot be less than 1 minute.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenCookMinutesMoreThan7Days() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setCookMinutes(50000000);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe cook time cannot be greater than 1 week.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenImageUrlNull() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setImageUrl(null);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWhenImageUrlTooLongAndInvalidPattern() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setImageUrl(lorem());
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertTrue(actual.getMessages().contains("Recipe image url too long."));
        assertTrue(actual.getMessages().contains("Image url does not appear valid."));
    }

    @Test
    void shouldNotCreateWhenImageUrlFailsRegex() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setImageUrl("099812348583295284198647326912489");
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Image url does not appear valid.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenSourceUrlNull() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setSourceUrl(null);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWhenSourceUrlTooLong() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setSourceUrl(lorem());
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertTrue(actual.getMessages().contains("Recipe source url too long."));
        assertTrue(actual.getMessages().contains("Source url does not appear valid."));
    }

    @Test
    void shouldNotCreateWhenSourceUrlFailsRegex() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setSourceUrl("099812348583295284198647326912489");
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Source url does not appear valid.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenIngredientsEmpty() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setIngredients(new ArrayList<>());
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe ingredient count must be between 1 and 50 ingredients.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenIngredientsListTooLarge() throws DataException {
        Recipe recipe = makeRecipe();
        List<RecipeIngredient> ingredients = new ArrayList<>();
        for (int i = 0; i < 51; i++) {
            ingredients.add(makeIngredient());
        }
        recipe.setIngredients(ingredients);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Recipe ingredient count must be between 1 and 50 ingredients.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenIngredientsNull() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setIngredients(null);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Ingredients list cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenCuisinesNull() throws DataException {
        Recipe recipe = makeRecipe();
        recipe.setCuisines(null);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Cuisine list cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenCuisineListTooLarge() throws DataException {
        Recipe recipe = makeRecipe();
        List<Cuisine> cuisines = recipe.getCuisines();
        Cuisine cuisine = new Cuisine();
        cuisine.setId(2);
        cuisine.setName("Mexican");
        cuisines.add(cuisine);
        cuisine.setId(3);
        cuisine.setName("Vietnamese");
        cuisines.add(cuisine);
        cuisine.setId(4);
        cuisine.setName("Greek");
        cuisines.add(cuisine);
        cuisine.setId(5);
        cuisine.setName("Southern");
        cuisines.add(cuisine);
        assertEquals(5, cuisines.size());
        recipe.setCuisines(cuisines);
        Result<Recipe> actual = service.create(recipe);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Whoa, calm down! Fusion Confusion! Keep it under 5 cuisines.", actual.getMessages().get(0));
    }

//    @Test
//    void shouldNotCreateExistingRecipe() {
//        Recipe recipe = makeRecipe();
//        Result<Recipe> actual = service.create(recipe);
//
//        assertTrue(actual.isSuccess());
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

    @Test
    void shouldNotUpdateNonExistingRecipe() throws DataException {
        Recipe recipe = makeRecipe();
        Result<Recipe> actual = service.update(recipe);

        assertFalse(actual.isSuccess());
        assertEquals(1, actual.getMessages().size());
        assertEquals(ResultType.NOT_FOUND, actual.getResultType());
        assertEquals("Recipe doesn't exist.", actual.getMessages().get(0));
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

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(makeIngredient());
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

    private RecipeIngredient makeIngredient() {
        RecipeIngredient ingredient = new RecipeIngredient();

        ingredient.setQuantity(10);

        Ingredient ing = new Ingredient();
        ing.setId(4);
        ingredient.setIngredient(ing);

        Unit unit = new Unit();
        unit.setId(1);
        ingredient.setUnit(unit);
        return ingredient;
    }

    public static byte[] generateRandomBlob(int size) {
        byte[] blob = new byte[size];
        new Random().nextBytes(blob);
        return blob;
    }

    private String lorem() {
        return "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime eos similique iste, soluta, modi " +
                "accusantium totam eius porro repellendus, delectus quia doloremque ducimus corrupti perferendis " +
                "vero deleniti incidunt? Inventore, voluptatibus! Lorem ipsum dolor sit amet consectetur adipisicing " +
                "elit. Vitae ex aut quisquam delectus unde debitis aspernatur iusto odio expedita itaque! Iste " +
                "tenetur molestias laborum voluptate ullam totam, beatae deserunt. Incidunt! Lorem ipsum dolor sit " +
                "amet consectetur adipisicing elit. Eaque, rerum veniam, possimus in quos vitae quae deserunt " +
                "laborum doloribus ratione facilis odio perspiciatis aspernatur debitis excepturi unde repudiandae " +
                "exercitationem doloremque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo " +
                "doloremque, dolores rerum sit esse ab, itaque vel libero fuga, adipisci" +
                " dicta tempora beatae. Minima inventore, doloremque consequatur ad aperiam laudantium! Lorem ipsum " +
                "dolor sit amet consectetur adipisicing elit. Sit, ullam labore. Nesciunt, aliquid numquam. Error " +
                "ducimus, possimus, porro illo ea quod et qui, nostrum ut incidunt dolorum voluptates repellat sequi.";
    }
}
