function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function init(){
    var data = getUser();
    console.log(data)
}

init()

/**
 * Create recipe cards to be displayed 
 */
function createRecipeCards() {
    let parentDiv = document.querySelector(".parentDiv");
    let mainElement = document.querySelector("main");
    for (let i = 0; i < numRecipes; i++) {
        let recipeCard = document.createElement("recipe-card");
        recipeCard.data = recipeData[i.toString()];
        parentDiv.appendChild(recipeCard);
    }
    mainElement.appendChild(parentDiv);
}

/**
 * Fetch recipes and populate them into recipeData
 * @param {Array} recipes recipes to fetch
 */
 async function fetchRecipes(recipes) {
    return new Promise((resolve, reject) => {  
        numRecipes = recipes.length;
        console.log(recipes);
        // Parse recipes from JSON to recipeData
        for (let i = 0; i < numRecipes; i++) {
            recipeData[i] = recipes[i];
            if(i == numRecipes - 1) {
                resolve(true);
            }
        }
    });
}

