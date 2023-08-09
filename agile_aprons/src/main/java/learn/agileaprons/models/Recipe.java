package learn.agileaprons.models;

import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class Recipe {
    private int id;
    private int userId;
    @NotBlank(message = "Recipe name cannot be blank.")
    @Size(max = 50, message = "Recipe name must be less than 50 characters.")
    private String title;
    @NotBlank(message = "Recipe instructions cannot be blank.")
    @Size(max = 5000, message = "Recipe instructions must be 5000 characters or less.")
    private String instructions;
    @Min(value = 1, message = "Recipe servings cannot be less than 1.")
    @Max(value = 50, message = "Recipe servings cannot be greater than 50.")
    private int servings;
    @Min(value = 1, message = "Recipe cook time cannot be less than 1 minute.")
    @Max(value = 25200, message = "Recipe cook time cannot be greater than 1 week.")
    private int cookMinutes;
    @NotNull
//    @Pattern(regexp = "(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-zA-Z0-9/.-]+)?|", message = "Image url does not appear valid.")
    @Size(max = 500, message = "Recipe image url must be under 500 characters.")
    private String imageUrl;
    @NotNull
    @Pattern(regexp = "(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-zA-Z0-9/.-]+)?|", message = "Source url does not appear valid.")
    @Size(max = 255, message = "Recipe source url too long.")
    private String sourceUrl;
    private byte [] image;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean dairyFree;
    @NotNull(message = "Ingredients list cannot be null.")
    @Size(min = 1, max=50, message = "Recipe ingredient count must be between 1 and 50 ingredients.")
    private List<RecipeIngredient> ingredients = new ArrayList<>();
    @NotNull(message = "Cuisine list cannot be null.")
    @Size(max = 4, message = "Whoa, calm down! Fusion Confusion! Keep it under 5 cuisines.")
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public List<RecipeIngredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<RecipeIngredient> ingredients) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return id == recipe.id && userId == recipe.userId && servings == recipe.servings && cookMinutes == recipe.cookMinutes && vegetarian == recipe.vegetarian && vegan == recipe.vegan && glutenFree == recipe.glutenFree && dairyFree == recipe.dairyFree && Objects.equals(title, recipe.title) && Objects.equals(instructions, recipe.instructions) && Objects.equals(imageUrl, recipe.imageUrl) && Objects.equals(sourceUrl, recipe.sourceUrl) && Arrays.equals(image, recipe.image) && Objects.equals(ingredients, recipe.ingredients) && Objects.equals(cuisines, recipe.cuisines);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, userId, title, instructions, servings, cookMinutes, imageUrl, sourceUrl, vegetarian, vegan, glutenFree, dairyFree, ingredients, cuisines);
        result = 31 * result + Arrays.hashCode(image);
        return result;
    }

    @Override
    public String toString() {
        return "Recipe {" +
                "id=" + id +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", instructions='" + instructions + '\'' +
                ", servings=" + servings +
                ", cookMinutes=" + cookMinutes +
                ", imageUrl='" + imageUrl + '\'' +
                ", sourceUrl='" + sourceUrl + '\'' +
                ", vegetarian=" + vegetarian +
                ", vegan=" + vegan +
                ", glutenFree=" + glutenFree +
                ", dairyFree=" + dairyFree +
                ", ingredients=" + ingredients +
                ", cuisines=" + cuisines +
                '}';
    }
}
