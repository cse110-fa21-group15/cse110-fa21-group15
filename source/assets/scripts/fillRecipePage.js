// Search for keys in JSON file
function searchForKey(object, key) {
    var value;
    Object.keys(object).some(function(k) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === "object") {
            value = searchForKey(object[k], key);
            return value !== undefined;
        }
    });
    return value;
}

// Grab elements from recipe page to fill in
const recipeName = document.querySelector("#recipeName");
const recipeImage = document.querySelector("#recipeImage");
const recipeTime = document.querySelector("#recipeTime");
const recipeCost = document.querySelector("#recipeCost");
const recipeServings = document.querySelector("#recipeServings");
const recipeDescription = document.querySelector("#recipeDescription");
const recipeIngredients = document.querySelector("#recipeIngredients");
const recipeSteps = document.querySelector("#recipeList");

// Grab keys from JSON file
const recipe = JSON.parse(localStorage.recipe);
const name = searchForKey(recipe, "name");
const image = searchForKey(recipe, "image");
const time  = searchForKey(recipe, "time");
const cost = searchForKey(recipe, "cost");
const servings = searchForKey(recipe, "servings");
const description = searchForKey(recipe, "description");
const ingredients = searchForKey(recipe, "ingredients");
const steps = searchForKey(recipe, "steps");

recipeName.textContent = name;
recipeImage.setAttribute("src", image);
recipeTime.textContent = time;
recipeCost.textContent = cost;
recipeServings.textContent = servings;
recipeDescription.textContent = description;

// Get recipe ingredients into the array to append them the ul element
let ingredientsArr = [];
let tempRecipes = ingredients;
ingredientsArr = tempRecipes.split("\n");

for (let i = 0; i < ingredientsArr.length; i++) {
    let tempElem = document.createElement("li");
    tempElem.textContent = ingredientsArr[i];
    if (tempElem.textContent === "") {
        continue;
    }
    recipeIngredients.appendChild(tempElem);
}

// Get recipe steps into an array to append them the ul element
let stepsArr = [];
let tempSteps = steps;
stepsArr = tempSteps.split("\n");

for (let i = 0; i < stepsArr.length; i++) {
    let tempElem = document.createElement("li");
    tempElem.textContent = stepsArr[i];
    if (tempElem.textContent === "") {
        continue;
    }
    recipeSteps.appendChild(tempElem);
}