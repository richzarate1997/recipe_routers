package learn.agileaprons.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SpoonacularRecipe {
    // This is a fabrication of the spoonacular recipe information response
    // solely needed to retrieve the response for further dissection.
    private int id;
    private String title;
    private int readyInMinutes;
    private int servings;
    private String sourceUrl;
    private String image;
    private String instructions;
    private ArrayList<String> cuisines;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean dairyFree;
    private ArrayList<SpoonacularIngredient> extendedIngredients;

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

    public int getReadyInMinutes() {
        return readyInMinutes;
    }

    public void setReadyInMinutes(int readyInMinutes) {
        this.readyInMinutes = readyInMinutes;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public ArrayList<String> getCuisines() {
        return cuisines;
    }

    public void setCuisines(ArrayList<String> cuisines) {
        this.cuisines = cuisines;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
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

    public ArrayList<SpoonacularIngredient> getExtendedIngredients() {
        return extendedIngredients;
    }

    public void setExtendedIngredients(ArrayList<SpoonacularIngredient> extendedIngredients) {
        this.extendedIngredients = extendedIngredients;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", readyInMinutes=" + readyInMinutes +
                ", servings=" + servings +
                ", sourceUrl='" + sourceUrl + '\'' +
                ", image='" + image + '\'' +
                ", instructions='" + instructions + '\'' +
                ", cuisines=" + cuisines +
                ", vegetarian=" + vegetarian +
                ", vegan=" + vegan +
                ", glutenFree=" + glutenFree +
                ", dairyFree=" + dairyFree +
                ", extendedIngredients=" + extendedIngredients +
                '}';
    }

//    All unused properties of the response
//    private String summary;
//    private String imageType;
//    private ArrayList<String> dishTypes;
//    private ArrayList<String> diets;
//    private ArrayList<String> occasions;
//    private boolean veryHealthy;
//    private boolean cheap;
//    private boolean veryPopular;
//    private boolean sustainable;
//    private boolean lowFodmap;
//    private int weightWatcherSmartPoints;
//    private String gaps;
//    private int preparationMinutes;
//    private int cookingMinutes;
//    private int aggregateLikes;
//    private int healthScore;
//    private String creditsText;
//    private String sourceName;
//    private double pricePerServing;
//    private Object winePairing;
//    private ArrayList<Object> analyzedInstructions;
//    private String originalId;
}
