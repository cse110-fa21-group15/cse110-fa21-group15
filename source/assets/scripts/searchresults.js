//document.querySelector('#tester').addEventListener('click', getUser);

//********************************************************************
/* main.js STARTS HERE */
//*********************************************************************
//Get users' favorite recipes

/*const user = await getUser();
console.log("GETUSER()");*/

let recipes = JSON.parse(localStorage.recipes);


let numRecipes;

const recipeData = {}


init(recipes);

  
  //Call this to begin getting recipe cards

  
  // This is the first function to be called, so when you are tracing your code start here.
  async function init(recipes) {
    console.log("hi");
    // fetch the recipes and wait for them to load
    let fetchSuccessful = await fetchRecipes(recipes);
    // if they didn't successfully load, quit the function
    if (!fetchSuccessful) {
      console.log('Recipe fetch unsuccessful');
      return;
    };
    // Add the first three recipe cards to the page
    createRecipeCards();

    recipePage(recipes);

async function fetchRecipes(recipes) {
  return new Promise((resolve, reject) => {

      numRecipes = recipes.length;
      let numNull = 0;
      let numRealRecipes = 0;
      console.log(recipes)
      //Parse recipes from JSON to recipeData
      for(let i = 0; i < numRecipes; ++i){
        if(recipes[i] == null){
          console.log(i);
          ++numNull;
          continue;
        }
        recipeData[i] = recipes[i];
        ++numRealRecipes;
      }
      numRecipes = numRecipes - numNull;
      if(numRealRecipes == numRecipes){
        resolve(true);
      }
  });
}
  
  function createRecipeCards() {
    let parentDiv = document.querySelector(".parentDiv");
    let mainElement = document.querySelector("main");
    for(let i = 0; i < numRecipes; ++i){
      let recipeCard = document.createElement("recipe-card");
      recipeCard.data = recipeData[i.toString()];
      parentDiv.appendChild(recipeCard);
    }
    mainElement.appendChild(parentDiv);
  
  }
  
  //Go to recipePage upon clicking recipe card
  function recipePage(recipes) {
    let recipeCard = document.querySelectorAll("recipe-card");
    console.log(recipes)
    
    for(let i = 0; i < recipeCard.length; ++i){
      recipeCard[i].addEventListener("click", function (){
        localStorage.recipe = JSON.stringify(recipes[i]);
        localStorage.recipeID = JSON.stringify(recipes[i].id);
        location.href = "recipePageSpoonacular.html";
      })
    }
  }

    /**x
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
