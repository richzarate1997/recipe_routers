package learn.agileaprons.data;

import learn.agileaprons.models.Recipe;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecipeRepository {
    List<Recipe> findAll();

    Recipe findById(int id);
    Recipe findByName(String name);

    Recipe add(Recipe recipe);

    boolean update(Recipe recipe);

    @Transactional
    boolean deleteById(int id);
}
