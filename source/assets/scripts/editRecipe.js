//editRecipe.js

const recipeNameInput = document.querySelector(".recipeNameText");
const recipeImageInput = document.querySelector(".recipeImage");
const recipeTimeInput = document.querySelector(".timeBoxInput");
const recipeCostInput = document.querySelector(".costBoxInput");
const recipeServingsInput = document.querySelector(".servingsBoxInput");
const recipeDescriptionInput = document.querySelector("#descriptionBoxInput");
const recipeIngredientsInput = document.querySelector("#ingredientsTextBox");
const recipeStepsInput = document.querySelector("#stepsTextBox");

sessionStorage.getItem("recipeName");

const recipeName = sessionStorage.getItem("recipeName");
const recipeImage = sessionStorage.getItem("recipeImage");
const recipeTime = sessionStorage.getItem("recipeTime");
const recipeCost = sessionStorage.getItem("recipeCost");
const recipeServings = sessionStorage.getItem("recipeServings");
const recipeDescription = sessionStorage.getItem("recipeDescription");
/*const recipeIngredients = sessionStorage.getItem("recipeIngredients");
const recipeSteps = sessionStorage.getItem("recipeSteps");*/

recipeNameInput.value = recipeName;
//recipeImageInput.value = recipeImage;
recipeTimeInput.value = recipeTime;
recipeCostInput.value = recipeCost;
recipeServingsInput.value = recipeServings;
recipeDescriptionInput.value = recipeDescription;
console.log(recipeImage);
/*recipeIngredientsInput = recipeIngredients
recipeStepsInput = recipeSteps*/




