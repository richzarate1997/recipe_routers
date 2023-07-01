package learn.agileaprons.data;

import learn.agileaprons.models.Recipe;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecipeRepository {
    List<Recipe> findAll();

    Recipe findById(int id);

    Recipe create(Recipe recipe);

    boolean update(Recipe recipe);

    boolean deleteById(int id);
}
