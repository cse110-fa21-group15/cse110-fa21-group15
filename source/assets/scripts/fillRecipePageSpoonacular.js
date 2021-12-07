const API_KEY = "apiKey=17d9935d04164997aef523459d06487b";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'
import { firebaseConfig } from './api.js'

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

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
let descriptionText = newDescription.querySelector("body").textContent;



recipeName.textContent = name;
recipeImage.setAttribute("src",image);
recipeTime.textContent = time;
recipeCost.textContent = cost;
recipeServings.textContent = servings;
recipeDescription.textContent = descriptionText;

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

let ingredientsString = "";
//Add ingredients to recipe page
for(let i = 0 ; i < ingredients.length; ++i){
  let tempElem = document.createElement("li");
  tempElem.textContent = ingredients[i].original;
  ingredientsString += tempElem.textContent;
  ingredientsString += "\n";
  recipeIngredients.appendChild(tempElem);
}

console.log(ingredientsString);



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

//Output recipe steps
let newSteps = new DOMParser().parseFromString(steps, "text/html");
let stepTemp = newSteps.querySelector("body").textContent;
let stepsArr = newSteps.querySelectorAll("li");
console.log(stepsArr);
let stepsString = "";

if(stepsArr.length != 0){
    for(let i = 0; i < stepsArr.length; ++i){
        recipeSteps.appendChild(stepsArr[i]);
        stepsString += stepsArr[i].textContent;
        stepsString += "\n";
      }
}
else{
    stepsArr = stepTemp.split(".");
    for(let i = 0 ; i < stepsArr.length - 1; ++i){
        let tempElem = document.createElement("li");
        tempElem.textContent = stepsArr[i];
        stepsString += stepsArr[i];
        stepsString += "\n";
        recipeSteps.appendChild(tempElem);
      }
}

//Upon clicking the "+" icon, save recipe to cookbook
const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", function(){
  downloadSpoonacularRecipe(time, name, cost, servings, descriptionText, ingredientsString, stepsString, image);
})


//Search for keys in JSON file
function searchForKey(object, key) {
    var value;
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = searchForKey(object[k], key);
        return value !== undefined;
      }
    });
    return value;
  }


  async function recipeInfo(id){
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?"+API_KEY;
    var recipeData = await fetch(url).then(response =>{
        return response.json();
    });
    localStorage.setItem("extraRecipeInfo", JSON.stringify(recipeData));

}


/**
 * Create a user recipe
 * @param event Event that occurs when recipe save button is clicked
 */
 async function downloadSpoonacularRecipe(time, name, cost, servings, description, ingredients, steps, image) {
  console.log("test")
  onAuthStateChanged (auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const id = user.uid;
    const database = doc(db, "users", id);
    try {
     const docRef = await addDoc(collection(db, "recipes"), {
         time: time, name: name, cost: cost, servings: servings, description: description, ingredients: ingredients, steps: steps, image: image, user_id : id
     })
     await updateDoc(docRef, {
       recipe_id : docRef.id
     })
     console.log(docRef.id)
     await updateDoc(database, {
         favoriteRecipes: arrayUnion(docRef.id)
       })
     location.href = 'cookbook.html';
   } catch (e) {
     console.error("Error adding document: ", e);
   }
      // ...
    } else {
      location.href = "signIn.html"
    }
  });
}