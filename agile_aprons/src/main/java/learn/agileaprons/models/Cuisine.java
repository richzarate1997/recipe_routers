package learn.agileaprons.models;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

public class Cuisine {
    private int id;
    @NotBlank(message = "Cuisine name cannot be blank.")
    @Max(value = 45, message = "Cuisine name cannot be greater than 45 characters.")
    private String name;

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
}
