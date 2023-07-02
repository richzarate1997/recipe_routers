package learn.agileaprons.models;

import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class User {
    private int id;
    @NotNull(message = "User display name cannot be null.")
    private String displayName;
    private boolean isMetric = true;
    private List<Recipe> myRecipes = new ArrayList<>();
    private List<Recipe> myFavorites = new ArrayList<>();
    private List<GroceryList> myLists = new ArrayList<>();

    public User() {}

    public User(int id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

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
