import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove, setDoc } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'


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

// if (window.location.href == window.location.origin + '/source/signUp.html') {
  document.querySelector('#sbutton').addEventListener('click', signUp);
// }

// if (window.location.href == window.location.origin + '/source/signIn.html') {
  document.querySelector('#lbutton').addEventListener('click', signIn);
// }

/**
 * Signup function that creates new user and returns the user id
 */
 async function signUp(event) {
  event.preventDefault();
  console.log("test")
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var user_id;
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    console.log('SIGNED UP');
    const user = userCredential.user;
    user_id = user.uid;
    await addUser(email, user.uid);
    location.href = 'homepage.html';
    const userInformation = getUser(user.uid);
    //console.log(userInformation);
    return userInformation;
  })
  .catch((error) => {
    console.log('INVALID SIGN UP');
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
/**
 * Sign in function that returns a user ID
 */
async function signIn(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log('SIGNED IN');
    const user = userCredential.user;
    location.href = 'homepage.html';
    // UID specifies which user we are talking about
    const userInformation = getUser(user.uid);
    return userInformation;
  })
  .catch((error) => {
    document.querySelector('#invalidLogin').innerHTML = 'Invalid Log In';
    console.log('WRONG LOG IN INFO');
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
    console.log(id + "ID")
    await setDoc(doc(db, "users", id), {
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

/**
 * Returns the information of a signed user such as favorite recipes, email, ID
 * @param {String} id 
 * @returns information regarding the user
 */
async function getUser() {
  let id = "D3TKWTnCklTvt5dWDNPlLbUQYa53"

  const userInformation = {};
  const users = collection(db, "users");
  const q = await query(users, where("user_id", "==", id));
  const querySnapshot = await getDocs(q);
  const createdRecipes = [];
  querySnapshot.forEach((doc) => {
    userInformation["results"] = doc.data();
  });
  for(let i = 0; i<userInformation.results.favoriteRecipes.length; i+=1) {
    createdRecipes.push( await getRecipe(userInformation.results.favoriteRecipes[i]));
  }
  userInformation.results.recipes = createdRecipes
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

/**
 * Checks if user is logged in and behaves accordingly
 */
onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      const signedInButton = document.querySelector('#signedIn');
      
      signedInButton.innerHTML = "Sign Out";
      signedInButton.addEventListener('click', () => {
          signOut(auth).then(() => {
              location.href = 'homepage.html';
              console.log('SIGNED OUT');
          }).catch((error) => {
              console.log('ERROR SIGNING OUT');
          });
      });

      console.log(uid);
      if (window.location.href == window.location.origin + '/source/cookbook.html') {
        // Get user using id and get recipes
      } 
  } else {
      if (window.location.href == window.location.origin + '/source/recipeUpload.html' || 
          window.location.href == window.location.origin + '/source/cookbook.html' ||
          window.location.href == window.location.origin + '/source/mealplan.html') {
        location.href = 'signIn.html';   
      }
  }
});
