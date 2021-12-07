// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'
import { firebaseConfig } from './api.js'

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

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
    } else {
        // User is signed out
        // ...
    }
});

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
        favoriteRecipes.add(await getRecipe(userData.favoriteRecipes[i]));
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
    } else {
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
    localStorage.favoriteRecipes = JSON.stringify(Array.from(favoriteRecipes));
    console.log(userFile.favoriteRecipes);
    const recipes = userFile.recipes;
    console.log("user recipes");
    console.log(recipes);
    init(recipes);
}

let numRecipes;
const recipeData = {}
  
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
        console.log('Recipe fetch unsuccessful');
        return;
    };
    // Add the first three recipe cards to the page
    createRecipeCards();
    //recipePage(recipes);
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
            if(i == numRecipes - 1) {
                resolve(true);
            }
        }
    });
}

/**
 * Create recipe cards to be displayed 
 */
function createRecipeCards() {
    let parentDiv = document.querySelector("table");
    
    for (let i = 0; i < numRecipes; i++) {
        // let row = document.createElement("tr");
        // let content = document.createElement("td");
        let recipeCard = document.createElement("recipe-card");
        let div = document.createElement("div");
        recipeCard.data = recipeData[i.toString()];
        let img = document.createElement("img");
        let recImg = searchForKey(recipeData[i.toString()],"image");
        img.setAttribute("src",recImg);
        
        let title = document.createElement("h4");
        let recTitle = searchForKey(recipeData[i.toString()],"name");
        title.textContent=recTitle;
        div.appendChild(title);
        div.appendChild(img);
        div.setAttribute("draggable","true");
        div.classList.add("ele");
        //document.getElementById("div").addEventListener("dragstart", drag, true);
        // let dragged;
        // document.addEventListener("dragstart", function(event) {
        //     console.log("event",event);
        //     event.dataTransfer.setData("text", event.target.id);
        //     // store a ref. on the dragged elem
        //     dragged = event.target;
        //     // make it half transparent
        //     event.target.style.opacity = .5;
        //   }, false);
        // div.classList.add(i.toString());
       
        parentDiv.appendChild(div);
        
        // content.appendChild(recipeCard);
        // row.appendChild(content);
        // parentDiv.appendChild(row);
    }
    
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
        recipeCard[i].addEventListener("click", function (){
            localStorage.recipe = JSON.stringify(recipes[i]);
            location.href = "recipePage.html";
        })
    }
}

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @returns {*} the value of the found key
 */
function searchForKey(object, key) {
    let value;
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

let dragged;
document.addEventListener("dragstart",function(event){
    //console.log("event",event);
    
    // store a ref. on the dragged elem
    if (event.target.className == "ele") {
        console.log("called");
        event.dataTransfer.setData("text", event.target.id);
        dragged = event.target;
    }
    // // make it half transparent
    // event.target.style.opacity = .5;
  }, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    if (event.target.className == "drag2") {
    event.preventDefault();}

  }, false);

document.addEventListener("drop", function(event) {
    console.log("event",event);
    console.log("dragged",dragged);
    console.log("target", event.target)
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "drag2") {
        //console.log(event.target);
        event.target.style.background = "";
        let title = event.target.querySelector("h4");
        let img = event.target.querySelector("img");
        console.log("title",title)
        console.log("img",img)
        let srcTitle = dragged.querySelector("h4").textContent;
        let srcImage = dragged.querySelector("img").src;
        console.log("srcTi",srcTitle)
        console.log("img",srcImage)
        title.textContent=srcTitle;
        img.setAttribute("src",srcImage);
        //dragged.parentNode.removeChild( dragged );
        //event.target.appendChild( dragged );
    }
  }, false);
