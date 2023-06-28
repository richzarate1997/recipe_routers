package learn.agileaprons.models;

import java.util.ArrayList;
import java.util.List;

public class GroceryList {
    private int id;
    private String name;
    private List<Ingredient> list;

    public GroceryList() {
    }

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
