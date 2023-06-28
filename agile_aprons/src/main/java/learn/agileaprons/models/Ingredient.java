package learn.agileaprons.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Ingredient {
    private int id;
    @NotBlank(message = "Ingredient name is required.")
    @Size(max = 50, message = "Ingredient name cannot be greater than 30 characters.")
    private String name;
    @NotBlank(message = "Ingredient image url is required")
    private String imageUrl;
    private String aisle;


    public Ingredient() {}

    public Ingredient(int id, String name, String imageUrl, String aisle) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.aisle = aisle;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAisle() {
        return aisle;
    }

    public void setAisle(String aisle) {
        this.aisle = aisle;
    }


}
