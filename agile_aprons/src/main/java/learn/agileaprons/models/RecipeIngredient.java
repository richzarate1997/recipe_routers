package learn.agileaprons.models;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

public class RecipeIngredient {
    private int recipeId;
    @NotNull(message = "Cannot add a null ingredient to recipe.")
    private Ingredient ingredient;
    @DecimalMin(value = "0.0001", message = "Quantity must be greater than 0.0001.")
    private double quantity;
    @NotNull(message = "Cannot add a recipe ingredient without a unit.")
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
