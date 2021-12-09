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
        console.log("No such document!");
    }
}

/**
 * Remove recipe from recipe book
 */
async function removeRecipe() {
    let id = "D3TKWTnCklTvt5dWDNPlLbUQYa53";
    const q = query(collection(db, "users"), where("user_id", "==", id));
    const querySnapshot = await getDocs(q);
    const document = querySnapshot.docs[0];
    console.log(document.id);
    console.log(document);
    let name = "pizza";
    let time = "30";
    let cost = "40";
    let servings = "3";
    let description = "testing";
    const database = doc(db, "users", document.id);
    // console.log(document.data())
    await updateDoc(database, {
        favoriteRecipes: arrayRemove({name: "pizza"})
    });
}

/**
 * Adds a user to the FireStore Database after creating an account
 * @param {string} email email of user
 * @param {string} id id of user
 */
async function addUser(email, id) {
    try {
        console.log(id + "ID");
        await setDoc(doc(db, "users", id), {
            user_email: email,
            user_id: id,
            favoriteRecipes: [],
            favorites: [],
            monday: null,
            tuesday: null, 
            wednesday: null,
            thursday: null,
            friday: null
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

/**
 * Returns the information of a signed user such as favorite recipes, email, ID
 * @param {string} id 
 * @return {Object} information regarding the user
 */
async function getUser() {
    let id = "D3TKWTnCklTvt5dWDNPlLbUQYa53";

    const userInformation = {};
    const users = collection(db, "users");
    const q = await query(users, where("user_id", "==", id));
    const querySnapshot = await getDocs(q);
    const createdRecipes = [];
    querySnapshot.forEach((doc) => {
        userInformation["results"] = doc.data();
    });
    for (let i = 0; i < userInformation.results.favoriteRecipes.length; i++) {
        createdRecipes.push( await getRecipe(userInformation.results.favoriteRecipes[i]));
    }
    userInformation.results.recipes = createdRecipes;
    console.log(userInformation);
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
            console.log("SIGNED UP");
            const user = userCredential.user;
            user_id = user.uid;
            await addUser(email, user.uid);
            location.href = "homepage.html";
            const userInformation = getUser(user.uid);
            //console.log(userInformation);
            return userInformation;
        })
        .catch((error) => {
            document.querySelector("#invalidSignUp").innerHTML = "Invalid Sign Up";
            console.log("INVALID SIGN UP");
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    } 
    else {
        document.querySelector("#invalidSignUp").innerHTML = "Passwords Do Not Match";
        console.log("INVALID SIGN UP");  
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
        console.log("SIGNED IN");
        const user = userCredential.user;
        location.href = "homepage.html";
        // UID specifies which user we are talking about
        const userInformation = getUser(user.uid);
        return userInformation;
    })
    .catch((error) => {
        document.querySelector("#invalidLogin").innerHTML = "Invalid Log In";
        console.log("WRONG LOG IN INFO");
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

// document.querySelector("#descriptionSubmit").addEventListener("click", createRecipe);

// document.querySelector("#tester").addEventListener("click", removeRecipe)

/**
 * Checks if user is logged in and behaves accordingly
 */
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const signedInButton = document.querySelector("#signedIn");

        signedInButton.innerHTML = "Sign Out";
        signedInButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                location.href = "homepage.html";
                console.log("SIGNED OUT");
            }).catch((error) => {
                console.log("ERROR SIGNING OUT");
            });
        });

        console.log(uid);
    } 
    else {
        // If not signed in, redirect to homepage.html if on createRecipe.html, cookbook.html, mealplan.html
        if (document.querySelector(".timeBoxInput") || document.querySelector(".parentDiv")||
            document.querySelector(".calendar")) {
            location.href = "signIn.html";   
        }
    }
});

if (document.querySelector("#sbutton")) {
    document.querySelector("#sbutton").addEventListener("click", signUp);
}

if (document.querySelector("#lbutton")) {
    document.querySelector("#lbutton").addEventListener("click", signIn);
}