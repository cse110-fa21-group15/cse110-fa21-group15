//editRecipe.js

const recipeNameInput = document.querySelector(".recipeNameText");
const recipeImageInput = document.querySelector(".recipeImage");
const recipeTimeInput = document.querySelector(".timeBoxInput");
const recipeCostInput = document.querySelector(".costBoxInput");
const recipeServingsInput = document.querySelector(".servingsBoxInput");
const recipeDescriptionInput = document.querySelector("#descriptionBoxInput");
const recipeIngredientsInput = document.querySelector("#ingredientsBoxInput");
const recipeStepsInput = document.querySelector("#stepsBoxInput");
console.log(recipeStepsInput);

recipeDescriptionInput.addEventListener("click", function(){
    alert("hey");
    console.log(recipeImageInput.value);
})



const recipeName = sessionStorage.getItem("recipeName");
//const recipeImage = sessionStorage.getItem("recipeImage");
const recipeTime = sessionStorage.getItem("recipeTime");
const recipeCost = sessionStorage.getItem("recipeCost");
const recipeServings = sessionStorage.getItem("recipeServings");
const recipeDescription = sessionStorage.getItem("recipeDescription");
const recipeIngredients = JSON.parse(localStorage.ingredients)
const recipeSteps = JSON.parse(localStorage.steps)

recipeNameInput.value = recipeName;
//recipeImageInput.value = recipeImage;
recipeTimeInput.value = recipeTime;
recipeCostInput.value = recipeCost;
recipeServingsInput.value = recipeServings;
recipeDescriptionInput.value = recipeDescription;
for(let i = 0; i < recipeIngredients.length; ++i){
    recipeIngredientsInput.value += recipeIngredients[i];
    recipeIngredientsInput.value += "\n";
}
for(let i = 0; i < recipeSteps.length; ++i){
    recipeStepsInput.value += recipeSteps[i];
    recipeStepsInput.value += "\n";
}




