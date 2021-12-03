import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'
import { firebaseConfig } from './api.js'

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  console.log("NEW STUFF");
  const db = getFirestore();

  // DELETE COMMENT WHEN DONE! ADD PARAMETERS!!
/**
 * 
 * @param {id of user logged in} id 
 * @param {name of recipe} name
 * @param {Time it takes to cook the meal} time 
 * @param {Cost of ingredients in the meal} cost 
 * @param {Number of servings in the meal} servings 
 * @param {Information regarding the meal} description 
 * @param {Image of meal} image
 * @param {tag of meal} tag
 */
 async function createRecipe(event) {
  event.preventDefault();
  console.log("test")
  onAuthStateChanged (auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const id = user.uid;
      const time = document.querySelector('.timeBoxInput').value
      const name = document.querySelector('.recipeNameText').value
      const cost = document.querySelector('.costBoxInput').value
      const servings = document.querySelector('.servingsBoxInput').value
      const description = document.querySelector('#descriptionBoxInput').value
      const ingredients = document.querySelector('#ingredientsBoxInput').value
      const steps = document.querySelector('#stepsBoxInput').value
      const image = await convertToBase64(document.querySelector("#imageUpload").files[0]);
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
      // User is signed out
      // ...
    }
  });
}


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



 /**
  * Converts an image to data url to store in the database.
  * @param {Image file uploaded when creating recipe} image 
  * @returns 
  */
 function convertToBase64(image) {
     var reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(image);
    })
 }

 /**
  * Creates the preview for the image on the upload recipe page.
  */
 function imagePreview() {
    var reader = new FileReader();
    const preview = document.querySelector(".uploadImage");
    const image = document.querySelector("#imageUpload").files[0];
    reader.onloadend = function() {
        console.log(reader.result);
        preview.src = reader.result;
    }
    reader.readAsDataURL(image);
 }

 //Event listeners for creating a recipe and displaying preview when image is uploaded.
 document.querySelector('#saveForm').addEventListener('click', createRecipe);
 document.querySelector("#imageUpload").addEventListener('change', imagePreview);

 onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
  