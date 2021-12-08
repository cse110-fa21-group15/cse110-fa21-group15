// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js"
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"
import { firebaseConfig } from "./api.js"

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
let favoriteRecipesSet = new Set();

// document.querySelector('#signUp').addEventListener('click', signUp);

/**
 * Sign in function that returns a user ID
 * @return information regarding the user
 */
async function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // UID specifies which user we are talking about
        const userInformation = getUser(user.uid);
        return userInformation;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

/**
 * Adds a user to the FireStore Database after creating an account
 * @param {string} email user's email
 * @param {string} id user's id
 */
async function addUser(email, id) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            user_email: email,
            user_id: id,
            favoriteRecipes: [],
            favorites: []
        });
    } 
    catch (e) {
        console.error("Error adding document: ", e);
    }
}

/**
 * Returns the information of a signed user such as favorite recipes, email, ID
 * @param {String} id  user's id
 * @returns information regarding the user
 */

 async function getUser(id) {
    const user = doc(db, "users", id)
    const userDoc = await getDoc(user);
    const createdRecipes = [];
    const favoriteRecipes = new Set();
    const userData = userDoc.data();
    for (let i = 0; i<userData.favoriteRecipes.length; i++) {
        createdRecipes.push(await getRecipe(userData.favoriteRecipes[i]));
    }
    for (let i = 0; i<userData.favorites.length; i++) {
        favoriteRecipes.add(await getRecipe(userData.favorites[i]));
    }
    const userInformation = {
        "user_email" : userData["user_email"],
        "user_id" : userData["user_id"],
        "recipes": createdRecipes,
        "favoriteRecipes": favoriteRecipes
    };
    console.log(userInformation);
    console.log("test");
    return userInformation;
}

/**
 * Returns the desired recipe
 * @param {string} recipe_id ID of recipe to be fetched
 * @return recipe data
 */
async function getRecipe(recipe_id) {
    const recipesRef = doc(db, "recipes", recipe_id);
    const docSnap = await getDoc(recipesRef);
  
    if (docSnap.exists()) {
        return docSnap.data();
    } 
    else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

//document.querySelector('#tester').addEventListener('click', getUser);

//********************************************************************
/* main.js STARTS HERE */
//*********************************************************************
//Get users' favorite recipes

/*const user = await getUser();
console.log("GETUSER()");*/

/**
 * Load the desired recipes
 * @param {string} id id of recipe
 */
async function loadRecipes(id) {
    const userFile = await getUser(id);
    console.log(userFile);
    const favoriteRecipes = userFile.favoriteRecipes;
    let tempFavorites = Array.from(favoriteRecipes);
    localStorage.favoriteRecipes = JSON.stringify(tempFavorites);
    console.log(userFile.favoriteRecipes);
    for(let i = 0; i < tempFavorites.length; ++i){
        favoriteRecipesSet.add(tempFavorites[i].recipe_id);
    }
    const recipes = userFile.recipes;
    init(recipes);
}

let numRecipes;
const recipeData = {};
  
// Call this to begin getting recipe cards

/**
 * Initial function to populate page with recipes
 * @param {Array} recipes recipes to display
 */ 
// This is the first function to be called, so when you are tracing your code start here.
async function init(recipes) {
    // fetch the recipes and wait for them to load
    let fetchSuccessful = await fetchRecipes(recipes);
    // if they didn't successfully load, quit the function
    if (!fetchSuccessful) {
        console.log("Recipe fetch unsuccessful");
        return;
    }
    // Add the first three recipe cards to the page
    createRecipeCards();
    recipePage(recipes);
}

/**
 * Fetch recipes and populate them into recipeData
 * @param {Array} recipes recipes to fetch
 */
async function fetchRecipes(recipes) {
    return new Promise((resolve, reject) => {  
        numRecipes = recipes.length;
        console.log(recipes);
        // Parse recipes from JSON to recipeData
        for (let i = 0; i < numRecipes; i++) {
            recipeData[i] = recipes[i];
            if (i === numRecipes - 1) {
                resolve(true);
            }
        }
    });
}
  
/**
 * Checks if user is logged in and behaves accordingly
 */
 onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        loadRecipes(uid);
        // ...
    } 
    else {
        // User is signed out
        // ...
    }
});

/**
 * Create recipe cards to be displayed 
 */
function createRecipeCards() {
    let parentDiv = document.querySelector("#regularDiv");
    let favoritesDiv = document.querySelector("#favoritesDiv");
    let mainElement = document.querySelector("main");
    for (let i = 0; i < numRecipes; i++) {
        let recipeCard = document.createElement("recipe-card");
        recipeCard.data = recipeData[i.toString()];
        if(favoriteRecipesSet.has(recipeData[i.toString()].recipe_id)){
            favoritesDiv.appendChild(recipeCard);
        }
        else{
            parentDiv.appendChild(recipeCard); 
        }
    }
    mainElement.appendChild(parentDiv);
}
  
// Go to recipePage upon clicking recipe card
/**
 * Go to recipePage upon clicking recipe card
 * @param {Array} recipes recipes to navigate to
 */
function recipePage(recipes) {
    let recipeCard = document.querySelectorAll("recipe-card");
    console.log(recipes);    
    for (let i = 0; i < recipeCard.length; i++) {
        recipeCard[i].addEventListener("click", function () {
            localStorage.recipe = JSON.stringify(recipes[i]);
            location.href = "recipePage.html";
        })
    }
}

// document.querySelector('#add').addEventListener('click', getUser)
