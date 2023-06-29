package learn.agileaprons.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class GroceryList {
    @NotNull
    private int id;
    @NotBlank(message = "Grocery List name cannot be blank.")
    private String name;
    private List<Ingredient> list = new ArrayList<>();


    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public List<Ingredient> getList() {
        return list;
    }

    public void setList(List<Ingredient> list) {
        this.list = list;
    }
}
