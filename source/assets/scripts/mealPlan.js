import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, setDoc, updateDoc, arrayUnion, doc, arrayRemove, deleteField } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { firebaseConfig } from "./api.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
let fillCalendarRecipes = new Map();

let numRecipes;
const recipeData = {};
const mealplanCalendar = new Map();

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
        if (object[k] && typeof object[k] === "object") {
            value = searchForKey(object[k], key);
            return value !== undefined;
        }
    });
    return value;
}

/**
 * Fetch recipes and populate them into recipeData
 * @param {Array} recipes recipes to fetch
 */
 async function fetchRecipes(recipes) {
    return new Promise((resolve, reject) => {  
        numRecipes = recipes.length;
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
 * Create recipe cards to be displayed 
 */
function createRecipeCards() {
    let parentDiv = document.querySelector("table");
    
    for (let i = 0; i < numRecipes; i++) {
        let row = document.createElement("tr");
        let td = document.createElement("td");
        let recipeCard = document.createElement("recipe-card");
        let div = document.createElement("div");
        recipeCard.data = recipeData[i.toString()];
        let img = document.createElement("img");
        let recImg = searchForKey(recipeData[i.toString()],"image");
        img.setAttribute("src",recImg);
        img.classList.add("dragImage");
        
        let recipe_id_elem = document.createElement("p");
        let recipe_id = searchForKey(recipeData[i.toString()],"recipe_id");
        recipe_id_elem.textContent = recipe_id;
        recipe_id_elem.setAttribute("hidden", true);
         
        let title = document.createElement("h4");
        let recTitle = searchForKey(recipeData[i.toString()],"name");
        title.textContent=recTitle;
        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(recipe_id_elem);
        div.setAttribute("draggable","true");
        div.classList.add("ele");
        td.appendChild(div);
        row.appendChild(td);
        parentDiv.appendChild(row);
    }
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
        console.error("No such document!");
    }
}

async function clickListener(evt){
    let tempRecipe = await getRecipe(evt.currentTarget.recipeId);
    localStorage.recipe = JSON.stringify(tempRecipe);
    window.location.href = "recipePage.html";
}

async function fillCalendar() {
    for (let i in fillCalendarRecipes) {
        let tempRecipe = await getRecipe(fillCalendarRecipes[i]);
        let calendarBox = document.getElementById(i);
        calendarBox.querySelector("img").setAttribute("src", searchForKey(tempRecipe, "image"));
        calendarBox.querySelector("h4").textContent = searchForKey(tempRecipe, "name");
        calendarBox.recipeId = fillCalendarRecipes[i];
        calendarBox.addEventListener("click", clickListener);
        mealplanCalendar.set(i, fillCalendarRecipes[i]);
    }
}

/**
 * Initial function to populate page with recipes
 * @param {Array} recipes recipes to display
 */ 
// This is the first function to be called, so when you are tracing your code start here.
async function init(recipes) {
    // Fetch the recipes and wait for them to load
    let fetchSuccessful = await fetchRecipes(recipes);
    // If they didn't successfully load, quit the function
    if (!fetchSuccessful) {
        console.error("Recipe fetch unsuccessful");
        return;
    }
    // Add the first three recipe cards to the page
    createRecipeCards();
    fillCalendar();
}

/**
 * Returns the information of a signed user such as favorite recipes, email, ID
 * @param {String} id  user's id
 * @returns information regarding the user
 */
 async function getUser(id) {
    const user = doc(db, "users", id);
    const userDoc = await getDoc(user);
    const createdRecipes = [];
    const favoriteRecipes = new Set();
    const userData = userDoc.data();
    for (let i = 0; i < userData.favoriteRecipes.length; i++) {
        createdRecipes.push(await getRecipe(userData.favoriteRecipes[i]));
    }
    for (let i = 0; i < userData.favorites.length; i++) {
        favoriteRecipes.add(await getRecipe(userData.favorites[i]));
    }
    const userInformation = {
        "user_email" : userData["user_email"],
        "user_id" : userData["user_id"],
        "recipes": createdRecipes,
        favoriteRecipes,
        "mealPlan":userData["mealPlan"]
    };
    return userInformation;
}

/**
 * Load the desired recipes
 * @param {string} id id of recipe
 */
 async function loadRecipes(id) {
    const userFile = await getUser(id);
    const favoriteRecipes = userFile.favoriteRecipes;
    localStorage.favoriteRecipes = JSON.stringify(Array.from(favoriteRecipes));
    const recipes = userFile.recipes;
    fillCalendarRecipes = userFile.mealPlan;
    init(recipes);
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
    }
});

/**
 * Go to recipePage upon clicking recipe card
 * @param {Array} recipes recipes to navigate to
 */
function recipePage(recipes) {
    let recipeCard = document.querySelectorAll("recipe-card");
    for (let i = 0; i < recipeCard.length; i++) {
        recipeCard[i].addEventListener("click", function (){
            localStorage.recipe = JSON.stringify(recipes[i]);
            location.href = "recipePage.html";
        });
    }
}

async function saveMealPlan() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;

            await updateDoc(doc(db, "users", uid), {
                mealPlan: deleteField()
            });

            const uploadMealPlan = Object.fromEntries(mealplanCalendar);
            await setDoc(doc(db, "users", uid), {
                mealPlan: uploadMealPlan,
            }, { merge: true });
        }
    });
}

let dragged;
document.addEventListener("dragstart", function(event) {
    // Store a ref. on the dragged elem
    if (event.target.className === "dragImage" || event.target.className === "ele") {
        event.dataTransfer.setData("text", event.target.id);
        dragged = event.target;
    }
    else if (event.target.className === "drag2") {
        event.dataTransfer.setData("text", event.target.id);
        dragged = event.target;
    }
}, false);

// Events fired on the drop targets
document.addEventListener("dragover", function(event) {
    // Prevent default to allow drop
    if (event.target.className === "drag2") {
        event.preventDefault();
    }
    else if (dragged.className === "drag2") {
        event.preventDefault();
    }
}, false);

document.addEventListener("drop", function(event) {
    // Prevent default action (open as link for some elements)
    event.preventDefault();
    // Move dragged elem to the selected drop target
    if (event.target.className === "drag2") {
        if (dragged.className === "drag2") {
            let title = dragged.parentNode.querySelector("h4");
            let img = dragged.parentNode.querySelector("img");
            let changeTitle = event.target.parentNode.querySelector("h4");
            let changeImg = event.target.parentNode.querySelector("img");
            let recipe_id = mealplanCalendar.get(dragged.parentNode.id);
            changeImg.setAttribute("src", img.src);
            changeTitle.textContent = title.textContent;
            mealplanCalendar.set(event.target.parentNode.id, recipe_id);
            (event.target.parentNode).recipeId = recipe_id;
            (event.target.parentNode).addEventListener("click", clickListener);
        }
        else if (dragged.className === "ele") {
            event.target.style.background = "";
            let title = event.target.parentNode.querySelector("h4");
            let img = event.target.parentNode.querySelector("img");
            let srcTitle = dragged.querySelector("h4").textContent;
            let srcImage = dragged.querySelector("img").src;
            let recipe_id = dragged.querySelector("p").textContent;
            title.textContent=srcTitle;
            img.setAttribute("src",srcImage);
            const mondayBreakfast = document.querySelector("#mondayBreakfast");
            mealplanCalendar.set(event.target.parentNode.id, recipe_id);
            (event.target.parentNode).recipeId = recipe_id;
            (event.target.parentNode).addEventListener("click", clickListener);
        }
        else {
            let title = event.target.parentNode.querySelector("h4");
            let img = event.target.parentNode.querySelector("img");
            let srcTitle = dragged.parentNode.querySelector("h4").textContent;
            let srcImage = dragged.parentNode.querySelector("img").src;
            let recipe_id = dragged.parentNode.querySelector("p").textContent;
            title.textContent=srcTitle;
            img.setAttribute("src",srcImage);
            mealplanCalendar.set(event.target.parentNode.id, recipe_id);
            (event.target.parentNode).recipeId = recipe_id;
            (event.target.parentNode).addEventListener("click", clickListener);

        }
    }
    // Remove recipes that are dragged out of calendar
    else if (dragged.className === "drag2") {
        let title = dragged.parentNode.querySelector("h4");
        let img = dragged.parentNode.querySelector("img");
        img.setAttribute("src","assets/images/Add.png");

        title.textContent = "recipeTitle";
        dragged.parentNode.removeEventListener("click", clickListener);

        title.textContent = "";

        mealplanCalendar.delete(dragged.parentNode.id);
    }
}, false);

const save = document.querySelector("#save");

save.addEventListener("click", function (event) {
    saveMealPlan();
});
