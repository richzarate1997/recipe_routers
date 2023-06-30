package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.IngredientRepository;
import learn.agileaprons.models.Ingredient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
public class IngredientServiceTest {
    @MockBean
    IngredientRepository repository;


    @Autowired
    IngredientService service;


    @Test
    void shouldFindPepperoni(){
        Ingredient expected = makeIngredient();
        when(repository.findById(6)).thenReturn(expected);

        Ingredient actual = service.findById(6);
        assertEquals(expected, actual);
    }
    @Test
    void shouldCreate(){
        Ingredient ingredient = makeIngredient();
        Ingredient mockout = makeIngredient();
        mockout.setId(6);

        when(repository.create(ingredient)).thenReturn(mockout);

        Result<Ingredient> actual = service.create(ingredient);
        assertTrue(actual.isSuccess());
        assertEquals(mockout, actual.getPayload());

    }
    @Test
    void shouldNotCreateWhenEmptyName() throws DataException {
        Ingredient ingredient = makeIngredient();
        ingredient.setName("");
        Result<Ingredient> actual = service.create(ingredient);
        assertEquals(ResultType.INVALID, actual.getResultType());

        ingredient = makeIngredient();
        ingredient.setName(null);
        actual = service.create(ingredient);
        assertEquals(ResultType.INVALID, actual.getResultType());

    }

    @Test
    void shouldNotCreateWhenLongName() throws DataException {
        Ingredient ingredient = makeIngredient();
        ingredient.setName("qwertyuiopasdfghjklzxcvbnmqwertyuiopqwe1235346dgfdr6");
        Result<Ingredient> actual = service.create(ingredient);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWhenLongAisleName() throws DataException {
        Ingredient ingredient = makeIngredient();
        ingredient.setAisle("qwertyuiopasdfghjklzxcvbnmqwertyuiopqwe1235346dgfdr6");
        Result<Ingredient> actual = service.create(ingredient);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    private Ingredient makeIngredient(){
        Ingredient ingredient = new Ingredient();
        ingredient.setName("Pepperoni");
        ingredient.setImageUrl("fake.png");
        ingredient.setAisle("Deli");
        return ingredient;
    }
}
