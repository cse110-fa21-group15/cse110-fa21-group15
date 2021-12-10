const API_KEY = "apiKey=9d680d9e4b2f4442a24618c2592e4a71";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { firebaseConfig } from "./api.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

async function recipeInfo(id) {
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?" + API_KEY;
    var recipeData = await fetch(url).then((response) => {
        return response.json();
    });
    localStorage.setItem("extraRecipeInfo", JSON.stringify(recipeData));
}

/**
* Create a user recipe
* @param event Event that occurs when recipe save button is clicked
*/
async function downloadSpoonacularRecipe(time, name, cost, servings, description, ingredients, steps, image) {
    onAuthStateChanged (auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const id = user.uid;
            const database = doc(db, "users", id);
            try {
                const docRef = await addDoc(collection(db, "recipes"), {
                    time, name, cost, servings, description, ingredients, steps, image, user_id : id
                });
                await updateDoc(docRef, {
                    recipe_id : docRef.id
                })
                await updateDoc(database, {
                    favoriteRecipes: arrayUnion(docRef.id)
                })
                location.href = "cookbook.html";
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            location.href = "signIn.html";
        }
    });
}

// Search for keys in JSON file
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

// Grab elements from recipe page to fill in
const recipeName = document.querySelector("#recipeName");
const recipeImage = document.querySelector("#recipeImage");
const recipeTime = document.querySelector("#recipeTime");
const recipeCost = document.querySelector("#recipeCost");
const recipeServings = document.querySelector("#recipeServings");
const recipeDescription = document.querySelector("#recipeDescription");
const recipeIngredients = document.querySelector("#recipeIngredients");
const recipeSteps = document.querySelector("#recipeList");

await recipeInfo(localStorage.recipeID);

// Grab keys from JSON file
const recipe = JSON.parse(localStorage.recipe);
const extraRecipeInfo = JSON.parse(localStorage.extraRecipeInfo);
const name = searchForKey(recipe, "title");
const image = recipe.image;
const time = searchForKey(recipe, "readyInMinutes");
const cost = searchForKey(recipe, "pricePerServing");
const servings = searchForKey(recipe, "servings");
const description = searchForKey(recipe, "summary");
const ingredients = searchForKey(extraRecipeInfo, "extendedIngredients");
const steps = searchForKey(extraRecipeInfo, "instructions");

let newDescription = new DOMParser().parseFromString(description, "text/html");
let descriptionText = newDescription.querySelector("body").textContent;

recipeName.textContent = name;
recipeImage.setAttribute("src", image);
recipeTime.textContent = time;
recipeCost.textContent = cost;
recipeServings.textContent = servings;
recipeDescription.textContent = descriptionText;

// Add ingredients to recipe page
let ingredientsString = "";
for (let i = 0 ; i < ingredients.length; i++) {
    let tempElem = document.createElement("li");
    tempElem.textContent = ingredients[i].original;
    ingredientsString += tempElem.textContent;
    ingredientsString += "\n";
    recipeIngredients.appendChild(tempElem);
}

// Output recipe steps
let newSteps = new DOMParser().parseFromString(steps, "text/html");
let stepTemp = newSteps.querySelector("body").textContent;
let stepsArr = newSteps.querySelectorAll("li");
let stepsString = "";

if (stepsArr.length !== 0) {
    for (let i = 0; i < stepsArr.length; i++) {
        recipeSteps.appendChild(stepsArr[i]);
        stepsString += stepsArr[i].textContent;
        stepsString += "\n";
    }
}
else {
    stepsArr = stepTemp.split(".");
    for (let i = 0 ; i < stepsArr.length - 1; i++) {
        let tempElem = document.createElement("li");
        tempElem.textContent = stepsArr[i];
        stepsString += stepsArr[i];
        stepsString += "\n";
        recipeSteps.appendChild(tempElem);
    }
}

// Upon clicking the "+" icon, save recipe to cookbook
const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", function() {
    downloadSpoonacularRecipe(time, name, cost, servings, descriptionText, ingredientsString, stepsString, image);
});