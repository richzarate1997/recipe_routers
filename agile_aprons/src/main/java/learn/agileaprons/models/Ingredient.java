package learn.agileaprons.models;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Ingredient {
    @NotNull
    private int id;
    @NotBlank(message = "Ingredient name is required.")
    @Size(max = 50, message = "Ingredient name cannot be greater than 50 characters.")
    private String name;
    @NotBlank(message = "Ingredient image url is required")
    @Size(max = 255, message = "Ingredient image url too long.")
    private String imageUrl;
    @Size(max = 20, message = "Aisle name cannot be greater than 20 characters.")
    private String aisle;

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
