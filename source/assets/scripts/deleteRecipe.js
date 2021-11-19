import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, doc, arrayRemove, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js'


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

/**
 * Deletes recipe from database
 * @param {ID of recipe to be deleted} recipe_id 
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
}

