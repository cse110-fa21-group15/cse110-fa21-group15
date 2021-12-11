import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove, setDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { firebaseConfig } from "./api.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

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
    } 
    else {
        // doc.data() will be undefined in this case
        console.error("No such document!");
    }
}

/**
 * Adds a user to the FireStore Database after creating an account
 * @param {string} email email of user
 * @param {string} id id of user
 */
async function addUser(email, id) {
    try {
        await setDoc(doc(db, "users", id), {
            user_email: email,
            user_id: id,
            favoriteRecipes: [],
            favorites: [],
            mealPlan: []
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
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
        favoriteRecipes
    };
    return userInformation;
}

/**
 * Signup function that creates new user and returns the user id
 * @param event Event that occurs when recipe save button is clicked
 * @return {Object} information regarding the user
 */
async function signUp(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmpassword").value;
    let user_id;
    if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            user_id = user.uid;
            await addUser(email, user.uid);
            location.href = "homepage.html";
            const userInformation = getUser(user.uid);
            return userInformation;
        })
        .catch((error) => {
            document.querySelector("#invalidSignUp").innerHTML = "Invalid Sign Up";
        });
    } 
    else {
        document.querySelector("#invalidSignUp").innerHTML = "Passwords Do Not Match";
        console.error("Invalid Sign Up");  
    }
}

/**
 * Sign in function that returns a user ID
 * @param event Event that occurs when recipe save button is clicked
 * @return {Object} information regarding the user
 */
async function signIn(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        location.href = "homepage.html";
        // UID specifies which user we are talking about
        const userInformation = getUser(user.uid);
        return userInformation;
    })
    .catch((error) => {
        document.querySelector("#invalidLogin").innerHTML = "Invalid Log In";
        console.error("Invalid Sign In");
    });
}

/**
 * Checks if user is logged in and behaves accordingly
 */
onAuthStateChanged(auth, (user) => {
    if (user) {
        const signedInButton = document.querySelector("#signedIn");

        signedInButton.innerHTML = "Sign Out";
        signedInButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                location.href = "homepage.html";
            }).catch((error) => {
                console.error("Erorr Signing Out");
            });
        });
    } 
    else {
        // If not signed in, redirect to homepage.html if on createRecipe.html, cookbook.html, mealplan.html
        if (document.querySelector(".timeBoxInput") || document.querySelector(".favoriteRecipes")||
            document.querySelector(".calendar")) {
            location.href = "signIn.html";   
        }
    }
});

if (document.querySelector("#sbutton")) {
    document.querySelector("#sbutton").addEventListener("click", signUp);
    document.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            signUp(event);
        }
    });
}

if (document.querySelector("#lbutton")) {
    document.querySelector("#lbutton").addEventListener("click", signIn);
    document.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            signIn(event);
        }
    });
}