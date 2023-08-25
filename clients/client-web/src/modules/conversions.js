import DOMPurify from 'dompurify';
import { toFraction } from 'fraction-parser';
import parse from 'html-react-parser';

export const renderCooktime = (cookMinutes) => {
  let result = "\n";
  if (cookMinutes >= 60) {
    result += Math.floor(cookMinutes / 60) + " hr ";
  }
  if (cookMinutes % 60 !== 0) {
    result += cookMinutes % 60 + " min";
  }
  return result;
};

export const renderIngredientText = (servings, ingredient) => {
  if (ingredient.unit.name === 'serving' && ingredient.quantity === servings) {
    if (ingredient.ingredient.aisle === 'Spices and Seasonings') return ingredient.ingredient.name + ' to taste'
    return `${ingredient.quantity} serving(s) ${ingredient.ingredient.name} `;
  } else {
    return `${toFraction(ingredient.quantity, true)} ${ingredient.unit.name} ${ingredient.ingredient.name}`
  }
};

export const hyphenate = (string) => {
  if (string.split(' ').length > 1){
    return string.split(' ').join('-');
  }
  return string;
};

export const renderInstructionText = (instructions) => {
  let cleanInstructions = DOMPurify.sanitize(instructions);
  return parse(cleanInstructions);
};