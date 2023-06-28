package learn.agileaprons.models;

public class Ingredient {
    private int id;
    private String name;
    private String imageUrl;
    private String aisle;
    private Double quantity;
    private Unit unit;


    public Ingredient() {}

    public Ingredient(int id, String name, String imageUrl, String aisle, Double quantity, Unit unit) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.aisle = aisle;
        this.quantity = quantity;
        this.unit = unit;
    }
    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
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
