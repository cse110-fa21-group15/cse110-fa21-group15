import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'


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
     const time = document.querySelector('.timeBoxInput').value
     const name = document.querySelector('.recipeNameText').value
     const cost = document.querySelector('.costBoxInput').value
     const servings = document.querySelector('.servingsBoxInput').value
     const description = document.querySelector('#descriptionBoxInput').value
     const ingredients = document.querySelector('#ingredientsBoxInput').value
     const steps = document.querySelector('#stepsBoxInput').value
     const image = await convertToBase64(document.querySelector("#imageUpload").files[0]);
    let id = "XAMVHtevNUXGs9MCRBDUKMCBwdK2"
   const q = query(collection(db, "users"), where("user_id", "==", id));
   const querySnapshot = await getDocs(q);
   const documents = querySnapshot.docs[0];
   const database = doc(db, "users", documents.id);
   try {
    const docRef = await addDoc(collection(db, "recipes"), {
        time: time, name: name, cost: cost, servings: servings, description: description, ingredients: ingredients, steps: steps, image: image
    })
    console.log(docRef.id)
    await updateDoc(database, {
        favoriteRecipes: arrayUnion(docRef.id)
      })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
 document.querySelector("#imageUpload").addEventListener('change', imagePreview)