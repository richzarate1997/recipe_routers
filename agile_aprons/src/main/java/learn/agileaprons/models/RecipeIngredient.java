package learn.agileaprons.models;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

public class RecipeIngredient {
    @NotNull
    private int recipeId;
    @NotNull
    private Ingredient ingredient;
    @NotNull
    @DecimalMin(value = "0.0001", message = "Quantity must be greater than 0.0001")
    private double quantity;
    @NotNull
    private Unit unit;

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
}
