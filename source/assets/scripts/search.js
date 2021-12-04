const API_KEY = "apiKey=17d9935d04164997aef523459d06487b";
const API_KEY_ALT = "apiKey=eb8f87242ae8478f9dc126f96c50fda0"
const SEARCH_URL = "https://api.spoonacular.com/recipes/complexSearch?"
const RANDOM_RECIPE_URL = "https://api.spoonacular.com/recipes/random?apiKey=17d9935d04164997aef523459d06487b&number=1"

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
async function getRecipes(event, filters = false, number = 14, offset = 0, currsize = 0, recurse = 0) {    
    // Get User Input
    let input = document.querySelector("input[name = 'search']").value;    
    
    // If no query, then no need to do anything
    // if (input == "") {
    //   return;
    // }

    //Build Base Url
    let url = SEARCH_URL+API_KEY_ALT +"&query=" + input + "&number=" + number + "&instructionsRequired=true" + "&offset=" + offset + "&addRecipeInformation=true";
    
    //If there are filters, then add time and dietary parameters to url
    if (filters == true) {
        let time = document.getElementById("time").value;
        let dietary = document.getElementById("dietary").value;
        let cost = document.getElementById("cost").value;
        if (time != "") {
            console.log("There is a time filter =" + time);
            url += ("&maxReadyTime=" + time);
        }
        if (dietary != "") {
            console.log("There is a dietary filter =" + dietary);
            url += ("&diet=" + dietary);
        }
        if (cost != "") {
            console.log("There is a cost filter =" + cost);
        }
    }

    // Fetch the recipes into a promise
    const fetchPromise = fetch(url);

    // Get the final list of recipes after applying the cost filtering as needed
    const final = fetchPromise.then((response) => {
        return response.json();
    }).then((results) => {
        //storeRecipe(results, input);    
        let recipes = results["results"];    
        let output = [];
        if (filters == true) {
            output =  filterCost(recipes, Number(cost));
        }
        else{
            output = recipes;
        }
        return output;
    })
    
    // Prevent search button from automatically reloading the page
    if (event != undefined) {
        event.preventDefault();
    }

    // Extract the actual list of recipes from the final promise
    let real = await final;

    // Maximum 5 recursive searches
    if (recurse == 5) {
        return real.slice(0, number);
    }

    // If not enough recipes after applying the filters recursively call this function again
    if (real.length + currsize < number) {
        let temp = await getRecipes(event,filters, number, offset+number, (currsize + real.length), recurse + 1);
        real = real.concat(temp);
    }
    
    //retrieveRecipe(input);
    storeRecipe(real.slice(0, number));
    redirectPage();
    //Return up to the "number" amount of recipes
    //console.log(real.slice(0, number));
}

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
        let output = [];
        for(let i = 0; i < recipes.length; i++) {
            if(recipes[i].pricePerServing > 250){
                if (cost == 3) {
                    output.push(recipes[i]);
                }
            }
            else if (recipes[i].pricePerServing > 125) {
                if (cost == 2) {
                    output.push(recipes[i]);
                }
            }
            else if (cost == 1) {
                output.push(recipes[i]);
            }
        }
    }
    return output;
}

/**
 * Redirect to results page
 */
async function redirectPage() {
    console.log("Redirecting to result page");
    window.location.href = "searchresults.html";
}

/**
 * Store recipe data retrieved
 * @param {Array} results recipe list
 * @param {string} input  where to store data
 */
async function storeRecipe(results, input) {
    //store data for all sessions, string only
    console.log("Storing recipes to local storage");
    let toStore = await results;
    localStorage.setItem("recipes", JSON.stringify(toStore));
}

/**
 * Retrieve results from local storage
 * @param {string} input where to retrieve data
 */
async function retrieveRecipe(input) {
    console.log("Retrieving recipes from local storage");
    myStorage = window.localStorage;
    const recipe_example = myStorage.getItem(input + "0");
    console.log(recipe_example);
}

/**
 * Fetches a random recipe
 * @returns random recipe
 */
async function randomRecipe(){
    let recipeData = await fetch(RANDOM_RECIPE_URL).then((response) => {
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
    let url = "https://api.spoonacular.com/recipes/" + id + "/information?" + API_KEY;
    let recipeData = await fetch(url).then((response) => {
        return response.json();
    });
    localStorage.setItem("extraRecipeInfo", JSON.stringify(recipeData));
    console.log(recipeData);
}

// function getSource(id){
//     let input = document.getElementById('search').value;
//     $.ajax({
//         url:"https://api.spoonacular.com/recipes/" + id +"/information?apiKey=d97a6e5c0e914bed85a619b32c3aa047",
//         success:function(response){
//             document.getElementById("sourceLink").innerHTML=response.sourceUrl;
//             //document.getElementById("sourceLink").href=response.sourceUrl;
//         }
//     })
// }

// function getRecipe(){
//     let input = document.getElementById('search').value;
//     $.ajax({
//         url:"https://api.spoonacular.com/recipes/complexSearch?apiKey=d97a6e5c0e914bed85a619b32c3aa047&query="+input,
//         success:function(response){
//             console.log(response.baseUrl);
//             document.getElementById("img-output").src=response.baseUrl+response.results[o].image;
//             //getSource(response.results[0].id);
//         }
//     })
// }
//