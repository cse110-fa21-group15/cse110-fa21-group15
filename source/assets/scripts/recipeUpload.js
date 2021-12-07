import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { firebaseConfig } from "./api.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log("NEW STUFF");
const db = getFirestore();

/**
 * Create a user recipe
 * @param event Event that occurs when recipe save button is clicked
 */
async function createRecipe(event) {
    event.preventDefault();
    console.log("test");
    onAuthStateChanged (auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const id = user.uid;
            const time = document.querySelector(".timeBoxInput").value;
            const name = document.querySelector(".recipeNameText").value;
            const cost = document.querySelector(".costBoxInput").value;
            const servings = document.querySelector(".servingsBoxInput").value;
            const description = document.querySelector("#descriptionBoxInput").value;
            const ingredients = document.querySelector("#ingredientsBoxInput").value;
            const steps = document.querySelector("#stepsBoxInput").value;
            const imageFile = document.querySelector("#imageUpload").files[0];
            if (!time || !name || !cost || !servings || !description || !ingredients || !steps || !imageFile) {
                document.querySelector(".uploadError").innerHTML = "Please make sure all fields are filled!";  
            }
            else {
                const image = await convertToBase64(imageFile);
                const database = doc(db, "users", id);
                try {
                    const docRef = await addDoc(collection(db, "recipes"), {
                        time, name, cost, servings, description, ingredients, steps, image, user_id : id
                    });
                    await updateDoc(docRef, {
                        recipe_id : docRef.id
                    })
                    console.log(docRef.id);
                    await updateDoc(database, {
                        favoriteRecipes: arrayUnion(docRef.id)
                    })
                    location.href = "cookbook.html";
                } 
                catch (e) {
                    console.error("Error adding document: ", e);
                }
                // ...
            }
        } 
        else {
            // User is signed out
            // ...
        }
    });
}

/**
 * Create a user recipe
 * @param event Event that occurs when recipe save button is clicked
 */
 async function downloadSpoonacularRecipe(event, time, name, cost, servings, description, ingredients, steps, image) {
  event.preventDefault();
  console.log("test")
  onAuthStateChanged (auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const id = user.uid;
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

/**
 * Adds a user to the FireStore Database
 * @param {string} email email of user
 * @param {string} id id of user
 */
async function addUser(email, id) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            user_email: email,
            user_id: id,
            favoriteRecipes: []
        });
    } 
    catch (e) {
        console.error("Error adding document: ", e);
    }
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
    };
    reader.readAsDataURL(image);
}

// Event listeners for creating a recipe and displaying preview when image is uploaded.
document.querySelector("#saveForm").addEventListener("click", createRecipe);
document.querySelector("#imageUpload").addEventListener("change", imagePreview);

/**
 * Checks if user is logged in and behaves accordingly
 */
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } 
    else {
        // User is signed out
        // ...
    }
});