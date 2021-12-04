const API_KEY = "apiKey=17d9935d04164997aef523459d06487b";

//Grab elements from recipe page to fill in
const recipeName = document.querySelector("#recipeName");
const recipeImage = document.querySelector("#recipeImage");
const recipeTime = document.querySelector("#recipeTime");
const recipeCost = document.querySelector("#recipeCost");
const recipeServings = document.querySelector("#recipeServings");
const recipeDescription = document.querySelector("#recipeDescription");
const recipeIngredients = document.querySelector("#recipeIngredients");
const recipeSteps = document.querySelector("#recipeList");

await recipeInfo(localStorage.recipeID);

//Grab keys from JSON file
const recipe = JSON.parse(localStorage.recipe);
const extraRecipeInfo = JSON.parse(localStorage.extraRecipeInfo);
console.log(extraRecipeInfo);
const name = searchForKey(recipe, "title");
const image = searchForKey(recipe, "image");
const time  = searchForKey(recipe, "readyInMinutes");
const cost = searchForKey(recipe, "pricePerServing");
const servings = searchForKey(recipe, "servings");
const description = searchForKey(recipe, "summary");
const ingredients = searchForKey(extraRecipeInfo, "extendedIngredients");
const steps = searchForKey(extraRecipeInfo, "instructions");

let newDescription = new DOMParser().parseFromString(description, "text/html");

recipeName.textContent = name;
recipeImage.setAttribute("src",image);
recipeTime.textContent = time;
recipeCost.textContent = cost;
recipeServings.textContent = servings;
recipeDescription.textContent = newDescription.querySelector("body").textContent;

//Get recipe ingredients into an array to append them the ul element
/*let ingredientsArr = [];
let tempRecipes = ingredients;
ingredientsArr = tempRecipes.split("\n");

for(let i = 0; i < ingredientsArr.length; ++i){
  let tempElem = document.createElement("li");
  tempElem.textContent = ingredientsArr[i];
  if(tempElem.textContent == ""){
    continue;
  }
  recipeIngredients.appendChild(tempElem);
}*/

for (let i = 0; i < ingredients.length; i++) {
    let tempElem = document.createElement("li");
    tempElem.textContent = ingredients[i].original;
    recipeIngredients.appendChild(tempElem);
}

//Get recipe steps into an array to append them the ul element
/*let stepsArr = [];
let tempSteps = steps;
stepsArr = tempSteps.split("\n");

for(let i = 0; i < stepsArr.length; ++i){
  let tempElem = document.createElement("li");
  tempElem.textContent = stepsArr[i];
  if(tempElem.textContent == ""){
    continue;
  }
  recipeSteps.appendChild(tempElem);
}*/

let newSteps = new DOMParser().parseFromString(steps, "text/html");
let stepTemp = newSteps.querySelector("body").textContent;
let stepsArr = newSteps.querySelectorAll("li");
console.log(stepsArr);

if (stepsArr.length != 0) {
    for (let i = 0; i < stepsArr.length; i++) {
        recipeSteps.appendChild(stepsArr[i]);
    }
}
else {
    stepsArr = stepTemp.split(".");
    for (let i = 0 ; i < stepsArr.length - 1; i++) {
        let tempElem = document.createElement("li");
        tempElem.textContent = stepsArr[i];
        recipeSteps.appendChild(tempElem);
    }
}

//Search for keys in JSON file
function searchForKey(object, key) {
    var value;
    Object.keys(object).some(function (k) {
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

async function recipeInfo(id){
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?" + API_KEY;
    var recipeData = await fetch(url).then(response => {
        return response.json();
    });
    localStorage.setItem("extraRecipeInfo", JSON.stringify(recipeData));
}