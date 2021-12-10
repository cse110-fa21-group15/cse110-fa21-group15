const API_KEY = "apiKey=fb846b5294704697b6e9eac926530a16";
const API_KEY_ALT = "apiKey=fb846b5294704697b6e9eac926530a16";
const SEARCH_URL = "https://api.spoonacular.com/recipes/complexSearch?";
const RANDOM_RECIPE_URL = "https://api.spoonacular.com/recipes/random?"+API_KEY+"&number=1";

/**
 * Takes a list of recipes and filters them by cost, and returns the filtered list
 * @param {Array} recipes list of recipes
 * @param {string} cost set cost
 * @return list of recipe with filter applied
 */
 function filterCost(recipes, cost) {
    if (cost == "") {
        return recipes;
    }
    else {
        var output = [];
        for (var i = 0; i < recipes.length; i++){
            if (recipes[i].pricePerServing > 250) {
                if (cost === 3) {
                    output.push(recipes[i]);
                }
            }
            else if (recipes[i].pricePerServing > 125) {
                if (cost === 2) {
                    output.push(recipes[i]);
                }
            }
            else if (cost === 1) {
                output.push(recipes[i]);
            }
        }
    }
    return output;
}

/**
 * Store recipe data retrieved
 * @param {Array} results recipe list
 * @param {string} input  where to store data
 */
 async function storeRecipe(results, input){
    // Store data for all sessions, string only
    var toStore = await results;
    localStorage.setItem("recipes", JSON.stringify(toStore));
}

/**
 * Redirect to results page
 */
 async function redirectPage() {
    window.location.href = "searchresults.html";
}

/**
 * Get recipes by searched keywords from database
 * @param event 
 * @param {Boolean} filters 
 * @param {Number} number 
 * @param {Number} offset 
 * @param {Number} currsize 
 * @param {Number} recurse 
 * return list of recipes
 */
async function getRecipes(event, filters = false, number = 14, offset = 0, currsize = 0, recurse = 0){    
    // Get User Input
    var input = document.querySelector("input[name = 'search']").value;    
    
    // Build Base Url
    var url = SEARCH_URL+API_KEY +"&query=" + input + "&number="+number + "&instructionsRequired=true" + "&offset=" + offset + "&addRecipeInformation=true";
    
    // If there are filters, then add time and dietary parameters to url
    if (filters === true) {
        var time = document.getElementById("time").value;
        var dietary = document.getElementById("dietary").value;
        var cost = document.getElementById("cost").value;
        if (time !== "") {
            url += ("&maxReadyTime=" + time);
        }
        if (dietary !== "") {
            url += ("&diet=" + dietary);
        }
        if (cost !== "") {
            url+= ("&cost=" + cost);
        }
    }

    // Fetch the recipes into a promise
    const fetchPromise = fetch(url);

    // Get the final list of recipes after applying the cost filtering as needed
    const final = fetchPromise.then((response) => {
        return response.json();
    }).then((results) => {
        var recipes = results["results"];
        var output = [];
        if (filters === true) {
            output =  filterCost(recipes, Number(cost));
        }
        else {
            output = recipes;
        }
        return output;
    });
    
    // Prevent search button from automatically reloading the page
    if (event !== undefined) {
        event.preventDefault();
    }

    // Extract the actual list of recipes from the final promise
    var real = await final;

    //Maximum 5 recursive searches
    if (recurse === 5) {
        return real.slice(0, number);
    }

    // If not enough recipes after applying the filters recursively call this function again
    if(real.length + currsize < number){
        var temp = await getRecipes(event,filters, number, offset+number, (currsize +real.length), recurse + 1);
        real = real.concat(temp);
    }
    
    storeRecipe(real.slice(0, number));
    redirectPage();
}

/**
 * Retrieve results from local storage
 * @param {string} input where to retrieve data
 */
async function retrieveRecipe(input) {
    myStorage = window.localStorage;
    const recipe_example = myStorage.getItem(input + "0");
}

/**
 * Fetches a random recipe
 * @returns random recipe
 */
async function randomRecipe() {
    var recipeData = await fetch(RANDOM_RECIPE_URL).then((response) => {
        return response.json();
    });
    return recipeData["recipes"][0];
}

/**
 * Fetch information about the recipe
 * @param {string} id 
 * @returns data about the recipe
 */
async function recipeInfo(id) {
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?" + API_KEY;
    var recipeData = await fetch(url).then((response) => {
        return response.json();
    });
    localStorage.setItem("extraRecipeInfo", JSON.stringify(recipeData));
}