import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove, } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyCwaLuRVV073aNbTB5EaLoZDIFXGzvqr3A",
    authDomain: "easy-chef-3eb03.firebaseapp.com",
    projectId: "easy-chef-3eb03",
    storageBucket: "easy-chef-3eb03.appspot.com",
    messagingSenderId: "744097831580",
    appId: "1:744097831580:web:ef9a05d277c2b1785b2b59",
    measurementId: "G-JKV8H3SLTR"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  console.log(auth);
  const db = getFirestore();




// PUT ID OF BUTTON THAT SAVES CHANGES UNDER THE FOLLOWING LINE
//  document.querySelector('#tester').addEventListener('click', updateRecipe);

/**
 * 
 * @param {Event that occurs when recipe save button is clicked} event 
 * @param {ID of recipe that needs to be updated} recipe_id 
 */
 async function updateRecipe(event, recipe_id) {
    event.preventDefault();
     const time = document.querySelector('.timeBoxInput').value
     const name = document.querySelector('.recipeNameText').value
     const cost = document.querySelector('.costBoxInput').value
     const servings = document.querySelector('.servingsBoxInput').value
     const description = document.querySelector('#descriptionBoxInput').value
     const ingredients = document.querySelector('#ingredientsBoxInput').value
     const steps = document.querySelector('#stepsBoxInput').value
     const image = await convertToBase64(document.querySelector("#imageUpload").files[0]);
    const docRef = doc(db, "recipes", recipe_id);
    await updateDoc(docRef, {
        time: time, name: name, cost: cost, servings: servings, description: description, ingredients: ingredients, steps: steps, image: image
    });
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
//  document.querySelector("#imageUpload").addEventListener('change', imagePreview)