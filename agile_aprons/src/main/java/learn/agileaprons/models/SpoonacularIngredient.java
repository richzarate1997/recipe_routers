package learn.agileaprons.models;

import java.util.ArrayList;

public class SpoonacularIngredient {

    // This is a fabrication of the spoonacular recipe - extendedIgnredient response
    // solely needed to retrieve the response for further dissection.
    private String nameClean;
    private double amount;
    private String unit;
    private String aisle;
    private String image;

    // \/\/\/\/\/\/\/\/\/\/\/\/\/ Unnecessary details below:
    private int id;
    private String name;
    private String consistency;
    private String original;
    private String originalName;
    private ArrayList<String> meta;
    private Object measures;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getConsistency() {
        return consistency;
    }

    public void setConsistency(String consistency) {
        this.consistency = consistency;
    }

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

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
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

    public ArrayList<String> getMeta() {
        return meta;
    }

    public void setMeta(ArrayList<String> meta) {
        this.meta = meta;
    }

    public Object getMeasures() {
        return measures;
    }

    public void setMeasures(Object measures) {
        this.measures = measures;
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
}
