package learn.agileaprons.models;

import javax.validation.constraints.NotBlank;

public class Unit {
    private int id;
    private String name;
    private String abbrev;

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

    public String getAbbreviation() {
        return abbrev;
    }

    public void setAbbreviation(String abbrev) {
        this.abbrev = abbrev;
    }
}
