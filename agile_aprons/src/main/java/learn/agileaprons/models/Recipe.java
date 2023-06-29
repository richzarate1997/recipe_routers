package learn.agileaprons.models;

import com.mysql.cj.jdbc.Blob;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;

public class Recipe {
    @NotNull
    private int id;
    @NotNull
    private int userId;
    @NotBlank(message = "Recipe name cannot be blank.")
    @Size(max = 50, message = "Recipe name must be less than 50 characters.")
    private String title;
    @NotBlank(message = "Recipe instructions cannot be blank.")
    private String instructions;
    @Min(value = 1, message = "Recipe servings cannot be less than 1.")
    @Max(value = 50, message = "Recipe servings cannot be greater than 50.")
    private int servings;
    @Min(value = 1, message = "Recipe cook time cannot be less than 1 minute.")
    @Max(value = 25200, message = "Recipe cook time cannot be greater than 1 week.")
    private int cookMinutes;
    @NotNull
    @Pattern(regexp = "(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-zA-Z0-9/.-]+)?|")
    private String imageUrl;
    @NotNull
    @Pattern(regexp = "(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-zA-Z0-9/.-]+)?|")
    private String sourceUrl;
    private Blob image;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean dairyFree;
    @Size(min = 1, max=50, message = "Recipe ingredient count must be between at least 1 and 50 ingredients.")
    private List<Ingredient> ingredients = new ArrayList<>();
    @Max(value = 4, message = "Whoa, calm down! Fusion Confusion! Keep it under 5 cuisines.")
    private List<Cuisine> cuisines = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public int getCookMinutes() {
        return cookMinutes;
    }

    public void setCookMinutes(int cookMinutes) {
        this.cookMinutes = cookMinutes;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isVegan() {
        return vegan;
    }

    public void setVegan(boolean vegan) {
        this.vegan = vegan;
    }

    public boolean isGlutenFree() {
        return glutenFree;
    }

    public void setGlutenFree(boolean glutenFree) {
        this.glutenFree = glutenFree;
    }

    public boolean isDairyFree() {
        return dairyFree;
    }

    public void setDairyFree(boolean dairyFree) {
        this.dairyFree = dairyFree;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public List<Cuisine> getCuisines() {
        return cuisines;
    }

    public void setCuisines(List<Cuisine> cuisines) {
        this.cuisines = cuisines;
    }
}
