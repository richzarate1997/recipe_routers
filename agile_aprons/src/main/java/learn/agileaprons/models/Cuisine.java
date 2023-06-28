package learn.agileaprons.models;

import javax.validation.constraints.NotBlank;

public class Cuisine {
    private int id;
    private String name;

    public Cuisine(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Cuisine(){

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
}
