package learn.agileaprons.models;

import java.util.List;

public class User {
    private int id;
    private String displayName;
    private boolean isMetric;
    private List<Recipe> myRecipes;
    private List<Recipe> myFavorites;
    private List<GroceryList> myLists;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public boolean isMetric() {
        return isMetric;
    }

    public void setMetric(boolean metric) {
        isMetric = metric;
    }

    public List<Recipe> getMyRecipes() {
        return myRecipes;
    }

    public void setMyRecipes(List<Recipe> myRecipes) {
        this.myRecipes = myRecipes;
    }

    public List<Recipe> getMyFavorites() {
        return myFavorites;
    }

    public void setMyFavorites(List<Recipe> myFavorites) {
        this.myFavorites = myFavorites;
    }

    public List<GroceryList> getMyLists() {
        return myLists;
    }

    public void setMyLists(List<GroceryList> myLists) {
        this.myLists = myLists;
    }
}
