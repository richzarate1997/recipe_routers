package learn.agileaprons.models;

import java.util.List;

public class SpoonacularSearchResponse {
    private List<SpoonacularRecipe> results;

    public List<SpoonacularRecipe> getResults() {
        return results;
    }

    public void setResults(List<SpoonacularRecipe> results) {
        this.results = results;
    }
}
