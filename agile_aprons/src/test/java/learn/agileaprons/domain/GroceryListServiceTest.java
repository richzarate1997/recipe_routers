package learn.agileaprons.domain;

import learn.agileaprons.data.DataException;
import learn.agileaprons.data.GroceryListRepository;
import learn.agileaprons.models.GroceryList;
import learn.agileaprons.models.Ingredient;
import learn.agileaprons.models.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class GroceryListServiceTest {

    @MockBean
    GroceryListRepository repository;
    @Autowired
    GroceryListService service;

    @Test
    void shouldFindGroceryListById(){
        GroceryList groceryList = makeGroceryList();
        groceryList.setId(1);

        when(repository.findById(1)).thenReturn(groceryList);

        GroceryList actual = service.findById(1);
        assertEquals(groceryList, actual);
    }

    @Test
    void shouldCreateGroceryList() throws DataException {
        GroceryList groceryList = makeGroceryList();
        GroceryList expectedGroceryList = makeGroceryList();
        expectedGroceryList.setId(4);

        when(repository.create(groceryList)).thenReturn(expectedGroceryList);
        Result<GroceryList> actual = service.create(groceryList);
        assertTrue(actual.isSuccess());
        assertNotNull(actual.getPayload());
        assertEquals(expectedGroceryList, actual.getPayload());
        assertEquals("Cheese", actual.getPayload().getList().get(0).getName());
    }

    @Test
    void shouldNotCreateNullGroceryList() throws DataException {
        Result<GroceryList> actual = service.create(null);
        assertFalse(actual.isSuccess());
        assertEquals("Grocery list cannot be null.", actual.getMessages().get(0));
    }

    @Test
    void shouldNotCreateWhenEmptyTitle() throws DataException {
        GroceryList groceryList = makeGroceryList();
        groceryList.setName("");
        Result<GroceryList> actual = service.create(groceryList);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }
    @Test
    void shouldNotCreateWhenNullTitle() throws DataException {
        GroceryList groceryList = makeGroceryList();
        groceryList.setName(null);
        Result<GroceryList> actual = service.create(groceryList);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void shouldNotCreateWithNonZeroId() throws DataException {
        GroceryList groceryList = makeGroceryList();
        groceryList.setId(20);
        Result<GroceryList> actual = service.create(groceryList);
        assertEquals(ResultType.INVALID, actual.getResultType());
    }

    @Test
    void sholdNotCreateWHenNameOver40Characters() throws DataException {
        GroceryList groceryList = makeGroceryList();
        groceryList.setName("superlongnamethatwilldefinetlybemorethan40characters123456789");
        Result<GroceryList> actual = service.create(groceryList);
        assertEquals(ResultType.INVALID, actual.getResultType());
        assertEquals("Grocery list name cannot be greater than 40 characters.", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdateExistingGroceryList() throws DataException {
        GroceryList toUpdate = new GroceryList();
        toUpdate.setId(2);
        toUpdate.setUserId(1);
        toUpdate.setName("Pepper Pizza");
    }


    @Test
    void shouldNotUpdateNullGroceryList() throws DataException {
        Result<GroceryList> actual = service.update(null);
        assertFalse(actual.isSuccess());
        assertEquals(1, actual.getMessages().size());
        assertEquals("Grocery list cannot be null.", actual.getMessages().get(0));
    }


    private GroceryList makeGroceryList(){
        GroceryList groceryList = new GroceryList();
        groceryList.setUserId(1);
        groceryList.setName("Richard's List");

        Ingredient ingredient = new Ingredient();
        ingredient.setId(1);
        ingredient.setName("Cheese");
        ingredient.setImageUrl("https://cheese.com/cheese.jpg");
        ingredient.setAisle("Dairy");

        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(2);
        ingredient2.setName("Dough");
        ingredient2.setImageUrl("http://bread.com/bread.jpg");
        ingredient2.setAisle("Bakery");

        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(ingredient);
        groceryList.setList(ingredients);


        return groceryList;
    }
}
