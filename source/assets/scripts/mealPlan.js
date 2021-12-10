// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, setDoc, updateDoc, arrayUnion, doc, arrayRemove, deleteField } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'
import { firebaseConfig } from './api.js'

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
let fillCalendarRecipes = new Map();

/**
 * Checks if user is logged in and behaves accordingly
 */
 onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        loadRecipes(uid);
        console.log("uid")
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
        favoriteRecipes.add(await getRecipe(userData.favorites[i]));
    }
    const userInformation = {
        "user_email" : userData["user_email"],
        "user_id" : userData["user_id"],
        "recipes": createdRecipes,
        "favoriteRecipes": favoriteRecipes,
        "mealPlan":userData["mealPlan"]
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
    fillCalendarRecipes = userFile.mealPlan;
    console.log(fillCalendarRecipes);
    console.log("user recipes");
    console.log(recipes);
    init(recipes);
}

let numRecipes;
const recipeData = {}
const mealplanCalendar = new Map();
  
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

    fillCalendar();
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
        let row = document.createElement("tr");
        let td = document.createElement("td");
        let recipeCard = document.createElement("recipe-card");
        let div = document.createElement("div");
        recipeCard.data = recipeData[i.toString()];
        let img = document.createElement("img");
        let recImg = searchForKey(recipeData[i.toString()],"image");
        img.setAttribute("src",recImg);
        
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
        td.appendChild(div);
        row.appendChild(td);
        parentDiv.appendChild(row);
        
        // content.appendChild(recipeCard);
        // row.appendChild(content);
        // parentDiv.appendChild(row);
    }
    
}

async function fillCalendar(){
    for(let i in fillCalendarRecipes){
        let tempRecipe = await getRecipe(fillCalendarRecipes[i]);
        let calendarBox = document.getElementById(i);
        calendarBox.querySelector("img").setAttribute("src", searchForKey(tempRecipe, "image"));
        calendarBox.querySelector("h4").textContent = searchForKey(tempRecipe, "name");
        mealplanCalendar.set(i,fillCalendarRecipes[i]);
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

    else if (event.target.className == "drag2") {
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
        event.preventDefault();
    }
    else if(dragged.className == "drag2"){
        event.preventDefault();
    }
    

  }, false);


  document.addEventListener("drop", function(event) {
    console.log("event",event);
    console.log("dragged",dragged);
    console.log("target", event.target)
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "drag2") {
        if(dragged.className == "drag2"){
            let title = dragged.parentNode.querySelector("h4");
            let img = dragged.parentNode.querySelector("img");
            let changeTitle = event.target.parentNode.querySelector("h4");
            let changeImg = event.target.parentNode.querySelector("img");
            changeImg.setAttribute("src",img.src);
            changeTitle.textContent = title.textContent;
            mealplanCalendar.set(event.target.parentNode.id, mealplanCalendar.get(dragged.parentNode.id));
            console.log(mealplanCalendar);
        }
        else{
            console.log(event.target.parentNode);
            event.target.style.background = "";
            console.log(event.target);
            let title = event.target.parentNode.querySelector("h4");
            let img = event.target.parentNode.querySelector("img");
            console.log("title",title)
            console.log("img",img)
            let srcTitle = dragged.querySelector("h4").textContent;
            let srcImage = dragged.querySelector("img").src;
            let recipe_id = dragged.querySelector("p").textContent;
            console.log("srcTi",srcTitle)
            console.log("img",srcImage)
            title.textContent=srcTitle;
            img.setAttribute("src",srcImage);
            console.log(recipe_id);
            //dragged.parentNode.removeChild( dragged );
            //event.target.appendChild( dragged );
            console.log("TESTTESTTEST");
            const mondayBreakfast = document.querySelector('#mondayBreakfast');
            console.log(mondayBreakfast)
            console.log("test")
            mealplanCalendar.set(event.target.parentNode.id, recipe_id);
            console.log(mealplanCalendar);
        }
    }
    //Remove recipes that are dragged out of calendar
    else if(dragged.className == "drag2"){
        let title = dragged.parentNode.querySelector("h4");
        let img = dragged.parentNode.querySelector("img");
        img.setAttribute("src","assets/images/Add.png");
        title.textContent = "";
        mealplanCalendar.delete(dragged.parentNode.id);
        console.log(mealplanCalendar);
    }
  }, false);


console.log("TESTTESTTEST");
const save = document.querySelector("#save")
console.log(save);

save.addEventListener("click", function (event) {
    console.log("testing save")
    saveMealPlan();
})

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
          console.log(uid);
        } else {
          // User is signed out
          // ...
        }
      });
}

function getRecipeInformation(recipe_id) {

}
// const mondayBreakfast = document.querySelector("#mondayBreakfast");
// const mondayLunch = document.querySelector("#mondayLunch");
// const mondayDinner = document.querySelector("#mondayDinner");
// const tuesdayBreakfast = document.querySelector("#tuesdayBreakfast");
// const tuesdayLunch = document.querySelector("#tuesdayLunch");
// const tuesdayDinner = document.querySelector("#tuesdayDinner");
// const wednesdayBreakfast = document.querySelector("#wednesdayBreakfast");
// const wednesdayLunch = document.querySelector("#wednesdayLunch");
// const wednesdayDinner = document.querySelector("#wednesdayDinner");
// const thursdayBreakfast = document.querySelector("#thursdayBreakfast");
// const thursdayLunch = document.querySelector("#thursdayLunch");
// const thursdayDinner = document.querySelector("#thursdayDinner");
// const fridayBreakfast = document.querySelector("#fridayBreakfast");
// const fridayLunch = document.querySelector("#fridayLunch");
// const fridayDinner = document.querySelector("#fridayDinner");
// const saturdayBreakfast = document.querySelector("#saturdayBreakfast");
// const saturdayLunch = document.querySelector("#saturdayLunch");
// const saturdayDinner = document.querySelector("#saturdayDinner");
// const sundayBreakfast = document.querySelector("#sundayBreakfast");
// const sundayLunch = document.querySelector("#sundayLunch");
// const sundayDinner = document.querySelector("#sundayDinner");















console.log("test")
