package learn.agileaprons.domain;

import learn.agileaprons.data.GroceryListRepository;
import learn.agileaprons.models.GroceryList;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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

    private GroceryList makeGroceryList(){
        GroceryList groceryList = new GroceryList();
        return groceryList;
    }
}
