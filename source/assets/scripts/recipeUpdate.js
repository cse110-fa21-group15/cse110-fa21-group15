import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js"
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove, } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js"
import { firebaseConfig } from "./api.js"

const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log(auth);
const db = getFirestore();

// PUT ID OF BUTTON THAT SAVES CHANGES UNDER THE FOLLOWING LINE

/**
 * 
 * @param event Event that occurs when recipe save button is clicked
 * @param {string} recipe_id ID of recipe that needs to be updated
 */
async function updateRecipe() {
    const recipe_id = sessionStorage.getItem("recipe_id");
    const time = document.querySelector(".timeBoxInput").value;
    const name = document.querySelector(".recipeNameText").value;
    const cost = document.querySelector(".costBoxInput").value;
    const servings = document.querySelector(".servingsBoxInput").value;
    const description = document.querySelector("#descriptionBoxInput").value;
    const ingredients = document.querySelector("#ingredientsBoxInput").value;
    const steps = document.querySelector("#stepsBoxInput").value;
    const imageFile = document.querySelector("#imageUpload").files[0];
    if (imageFile) {
        const fileType = imageFile["type"];
        const validImageTypes = ["image/png", "image/jpeg", "image/gif"];
        if (validImageTypes.includes(fileType)) {
            const image = await convertToBase64(imageFile);
            const docRef = doc(db, "recipes", recipe_id);
            await updateDoc(docRef, {
                time: time, name: name, cost: cost, servings: servings, description: description, ingredients: ingredients, steps: steps, image: image
            })
        }
    }
    else {
        const docRef = doc(db, "recipes", recipe_id);
        await updateDoc(docRef, {
            time: time, name: name, cost: cost, servings: servings, description: description, ingredients: ingredients, steps: steps
        })
    }
    location.href = "cookbook.html";
 }

 /**
  * Converts an image to data url to store in the database.
  * @param {string} image Image file uploaded when creating recipe
  */
function convertToBase64(image) {
    let reader = new FileReader();
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
    let reader = new FileReader();
    const preview = document.querySelector(".uploadImage");
    const image = document.querySelector("#imageUpload").files[0];
    const fileType = image["type"];
    const validImageTypes = ["image/png", "image/jpeg", "image/gif"];
    if (!validImageTypes.includes(fileType)) {
        document.querySelector(".recipePictureText").innerHTML = "Invalid File Type. Please use .PNG or .JPEG!";
        document.querySelector(".recipePictureText").classList.add("recipePictureTextRed");
    }
    else {
        if (document.querySelector(".recipePictureTextRed")) {
            document.querySelector(".recipePictureText").innerHTML = "Upload Recipe Image";
            document.querySelector(".recipePictureText").classList.remove("recipePictureTextRed");
        }
    }
    reader.onloadend = function() {
        console.log(reader.result);
        preview.src = reader.result;
    }
    reader.readAsDataURL(image);
 }

// Event listeners for creating a recipe and displaying preview when image is uploaded.
//document.querySelector("#imageUpload").addEventListener("change", imagePreview)
document.querySelector("#saveForm").addEventListener("click", updateRecipe);
document.querySelector("#imageUpload").addEventListener("change", imagePreview);