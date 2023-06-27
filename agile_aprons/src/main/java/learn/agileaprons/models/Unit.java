package learn.agileaprons.models;

public class Unit {
    private int id;
    private String name;
    private String abbrev;

    public Unit(int id, String name, String abbrev) {
        this.id = id;
        this.name = name;
        this.abbrev = abbrev;
    }

    public Unit(){

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

    public String getAbbreviation() {
        return abbrev;
    }

    public void setAbbreviation(String abbrev) {
        this.abbrev = abbrev;
    }
}
