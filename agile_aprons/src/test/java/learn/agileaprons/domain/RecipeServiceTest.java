package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.RecipeRepository;
import learn.agileaprons.models.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RecipeServiceTest {

    @MockBean
    RecipeRepository repository;

    @Autowired
    RecipeService service;

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

        return recipe;
    }
}
