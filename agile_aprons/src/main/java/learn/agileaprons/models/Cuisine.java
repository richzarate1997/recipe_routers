package learn.agileaprons.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class Cuisine {
    @NotNull
    private int id;
    @NotBlank(message = "Cuisine name cannot be blank.")
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
