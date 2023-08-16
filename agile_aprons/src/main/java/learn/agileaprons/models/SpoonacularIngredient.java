package learn.agileaprons.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SpoonacularIngredient {

    // This is a fabrication of the spoonacular recipe - extendedIngredient response
    // solely needed to retrieve the response for further dissection.
    private String name;
    private String nameClean;
    private double amount;
    private String unit;
    private String aisle;
    private String image;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameClean() {
        return nameClean;
    }

    public void setNameClean(String nameClean) {
        this.nameClean = nameClean;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getAisle() {
        return aisle;
    }

    public void setAisle(String aisle) {
        this.aisle = aisle;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "{" +
                "aisle='" + aisle + '\'' +
                ", image='" + image + '\'' +
                ", name='" + name + '\'' +
                ", amount=" + amount +
                ", unit='" + unit + '\'' +
                '}';
    }

//    All unused ingredient properties from response:
//    private int id;
//    private String name;
//    private String consistency;
//    private String original;
//    private String originalName;
//    private ArrayList<String> meta;
//    private Object measures;
}
