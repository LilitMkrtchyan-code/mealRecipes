import { currentYear } from "../utils/script.js";

const recipeDetails = document.querySelector("#recipe-details");
const recipeContainer = document.querySelector("#recipe-container");

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("recipeId");

function createRecipeFigure(recipe) {
  const figure = document.createElement("figure");
  figure.classList.add("recipe-figure");
  figure.innerHTML = `
       <figcaption class="recipe-caption">${recipe.name}</figcaption>
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
  `;
  recipeContainer.prepend(figure);
  return figure;
}

function createMealIngredients(recipe) {
  const mealIngredients = document.createElement("div");
  mealIngredients.classList.add("meal-ingredients");

  if (recipe.ingredients && recipe.ingredients.length > 0) {
    const ingredients = recipe.ingredients.join(", ");
    mealIngredients.innerHTML = `
    <h3 class="meal-ingredients-title">Ingredients</h3>
     <div class="ingredients">${ingredients}</div>
  `;
  } else {
    mealIngredients.innerHTML = `
    <h3 class="meal-ingredients-title">Ingredients</h3>
    <div class="ingredients">No ingredients available.</div>
  `;
  }
  recipeDetails.append(mealIngredients);
  return mealIngredients;
}

function createMealInstructions(recipe) {
  const mealInstructions = document.createElement("div");
  mealInstructions.classList.add("meal-instructions");
  mealInstructions.innerHTML = `
   <h3 class="meal-instructions-title">Instructions</h3>
      <ul class="meal-instructions-list">
      ${recipe.instructions
        .map((instruction) => `<li>${instruction}</li>`)
        .join("")}
      </ul>
   `;
  recipeDetails.append(mealInstructions);
  return mealInstructions;
}

if (recipeId) {
  
  fetch(`https://dummyjson.com/recipes/${recipeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Recipe not found');
      }
      return response.json();
    })
    .then((recipe) => {
      createRecipeFigure(recipe);
      createMealIngredients(recipe);
      createMealInstructions(recipe);
    })
    .catch((error) => {
      recipeDetails.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
    });
} else {
  recipeDetails.innerHTML = `<p class="error-message">No recipeId found in URL</p>`;
}

document.querySelector("#current-year").textContent = currentYear;
