// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyCwaLuRVV073aNbTB5EaLoZDIFXGzvqr3A",
  authDomain: "festive-minsky-ab51a6.netlify.app",
  projectId: "easy-chef-3eb03",
  storageBucket: "easy-chef-3eb03.appspot.com",
  messagingSenderId: "744097831580",
  appId: "1:744097831580:web:ef9a05d277c2b1785b2b59",
  measurementId: "G-JKV8H3SLTR"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// UNCOMMENT THE 2 BELOW LINES WHEN BUTTONS ARE CONNECTED TO SIGNIN AND SIGNUP

// document.querySelector('#signUp').addEventListener('click', signUp);

/**
 * Sign in function that returns a user ID
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
 * addUser function that adds a user to the FireStore Database after creating an account
 * @param {string} email 
 * @param {string} id 
 */
async function addUser(email, id) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      user_email: email,
      user_id: id,
      favoriteRecipes: [],
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



// document.querySelector('#descriptionSubmit').addEventListener('click', createRecipe);

async function removeRecipe() {
  let id = "D3TKWTnCklTvt5dWDNPlLbUQYa53"
  const q = query(collection(db, "users"), where("user_id", "==", id));
  const querySnapshot = await getDocs(q);
  const document = querySnapshot.docs[0];
  console.log(document.id)
  console.log(document)
  let name = "pizza";
  let time = "30";
  let cost = "40";
  let servings = "3";
  let description = "testing";
  const database = doc(db, "users", document.id);
  // console.log(document.data())
    await updateDoc(database, {
      favoriteRecipes: arrayRemove({name: "pizza"})
    })
}
// document.querySelector('#tester').addEventListener('click', removeRecipe)


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
 * @param {String} id 
 * @returns information regarding the user
 */
 async function getUser(id) {
      const user = doc(db, "users", id)
      const userDoc = await getDoc(user);
      const createdRecipes = [];
      const userData = userDoc.data();
      for(let i = 0; i<userData.favoriteRecipes.length; i+=1) {
        createdRecipes.push( await getRecipe(userData.favoriteRecipes[i]));
      }
      const userInformation = {
        "user_email" : userData["user_email"],
        "user_id" : userData["user_id"],
        "recipes": createdRecipes
      };
      console.log(userInformation);
      return userInformation;
  }





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


async function loadRecipes(id) {
  const userFile = await getUser(id);
  const recipes = userFile.recipes;
  init(recipes);
}


  let numRecipes;

  const recipeData = {}
  
  //Call this to begin getting recipe cards

  
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

    recipePage(recipes);

  }
  async function fetchRecipes(recipes) {
    return new Promise((resolve, reject) => {
  
        numRecipes = recipes.length;

        console.log(recipes);
        //Parse recipes from JSON to recipeData
        for(let i = 0; i < numRecipes; ++i){
          recipeData[i] = recipes[i];
          if(i == numRecipes - 1){
            resolve(true);
          }
        }
    });
  }
  
  function createRecipeCards() {
    for(let i = 0; i < numRecipes; ++i){
      let recipeCard = document.createElement("recipe-card");
      recipeCard.data = recipeData[i.toString()];
      let mainElement = document.querySelector("main");
      mainElement.appendChild(recipeCard);
    }
  
  }
  
  //Go to recipePage upon clicking recipe card
  function recipePage(recipes) {
    let recipeCard = document.querySelectorAll("recipe-card");
    console.log(recipes)
    
    for(let i = 0; i < recipeCard.length; ++i){
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




// document.querySelector('#add').addEventListener('click', getUser)
