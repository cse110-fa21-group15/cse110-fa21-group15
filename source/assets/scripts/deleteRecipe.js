import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'
import { firebaseConfig } from './api.js'

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();

/**
 * Deletes recipe from database
 * @param {string} recipe_id ID of recipe to be deleted
 */
async function deleteRecipe(recipe_id, user_id) {
    
    //Deletes document from recipes table
    await deleteDoc(doc(db, "recipes", recipe_id))
    const q = query(collection(db, "users"), where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs[0];
    const database = doc(db, "users", documents.id);
    await updateDoc(database, {
        favoriteRecipes: arrayRemove(recipe_id)
      })
      location.href = 'cookbook.html';
}

const deleteBtn = document.querySelector("#delete");

const recipe = JSON.parse(localStorage.recipe);

const user_id = searchForKey(recipe, "user_id");
const recipe_id = searchForKey(recipe, "recipe_id");

console.log("TEST");
console.log(user_id);
console.log(recipe_id);

deleteBtn.addEventListener("click", function(){
    console.log("onlick is working");
    deleteRecipe(recipe_id, user_id);
})


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

