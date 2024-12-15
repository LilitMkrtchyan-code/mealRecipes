import { currentYear } from "../utils/script.js";

const mealsList = document.querySelector("#meals-list");

function createRecipeCard(recipe) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.setAttribute("data-id", recipe.id);

  meal.innerHTML = `
        <figure class="meal-figure">
          <img src="${recipe.image}" alt="${recipe.name}" class="meal-image">
          <figcaption class="meal-caption">${recipe.name}</figcaption>
        </figure>
   `;
  mealsList.append(meal);
  return meal;
}

fetch("https://dummyjson.com/recipes")
  .then((response) => {
    if (!response.ok) {
      alert("Server Error");
      throw new Error("Server Error");
    }
    return response.json();
  })
  .then((data) => {
    data.recipes.forEach((recipe) => {
      createRecipeCard(recipe);
    });
  })
  .catch((error) => {
    mealsList.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
  });

mealsList.addEventListener("click", function (event) {
  const clickedMeal = event.target.closest(".meal");

  if (clickedMeal) {
    const mealId = clickedMeal.getAttribute("data-id");
    const recipeURL = `meal-recipe.html?recipeId=${mealId}`;
    window.location.href = recipeURL;
  }
});
document.querySelector("#current-year").textContent = currentYear;
