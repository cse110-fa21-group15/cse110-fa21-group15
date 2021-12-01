const API_KEY = "apiKey=818daa16f8f44a6790d7e444c55f92b8";
const API_KEY_ALT = "apiKey=eb8f87242ae8478f9dc126f96c50fda0"
const SEARCH_URL = "https://api.spoonacular.com/recipes/complexSearch?"

//get recipes by searched keywords from database 
async function getRecipes(event, filters = false, number = 8, offset = 0, currsize = 0, recurse = 0){    
    
    //Get User Input
    var input = document.querySelector("input[name = 'search']").value;    
    
    //If no query, then no need to do anything
    if (input == "") {
        return;
    }

    //Build Base Url
    var url = SEARCH_URL+API_KEY_ALT +"&query=" + input + "&number="+number + "&instructionsRequired=true" + "&offset=" + offset;
    
    //If there are filters, then add time and dietary parameters to url
    if(filters == true)
    {
        var time = document.getElementById("time").value;
        var dietary = document.getElementById("dietary").value;
        var cost = document.getElementById("cost").value;
        if(time != ""){
            console.log("There is a time filter =" + time)
            url+= ("&maxReadyTime=" + time);
        }
        if(dietary != ""){
            console.log("There is a dietary filter =" + dietary)
            url+= ("&diet=" + dietary);
        }
        if(cost != ""){
            console.log("There is a cost filter =" + cost)
            url+= "&addRecipeInformation=true";
        }

    }
    
    //Fetch the recipes into a promise
    const fetchPromise = fetch(url);

    //Get the final list of recipes after applying the cost filtering as needed
    const final = fetchPromise.then(response => {
        return response.json();
    }).then(results => {
        //storeRecipe(results, input);    
        var recipes = results['results'];    
        var output = [];
        if(filters == true){
            output =  filterCost(recipes, Number(cost));
        }
        else{
            output = recipes;
        }
        return output;
    })
    
    //Prevent search button from automatically reloading the page
    if(event != undefined){
        event.preventDefault();
    }

    //Extract the actual list of recipes from the final promise
    var real = await final;

    //Maximum 5 recursive searches
    if(recurse == 5){
        return real.slice(0, number);
    }

    //If not enough recipes after applying the filters recursively call this function again
    if(real.length + currsize < number){
        var temp = await getRecipes(event,filters, number, offset+number, (currsize +real.length), recurse + 1);
        real = real.concat(temp);
    }
    
    //redirectPage();
    //retrieveRecipe(input);

    //Return up to the "number" amount of recipes
    console.log(real.slice(0, number));
    return real.slice(0, number);
}



//Takes a list of recipes and filters them by cost, and returns the filtered list
function filterCost(recipes, cost){
    if(cost == ""){
        return recipes;
    }
    else {
        var output = [];
        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].pricePerServing > 250){
                if(cost == 3){
                    output.push(recipes[i]);
                }
            }
            else if(recipes[i].pricePerServing > 125){
                if(cost == 2){
                    output.push(recipes[i]);
                }
            }
            else if(cost == 1){
                output.push(recipes[i]);
            }
        }
    }
    return output;
}

//redirect to results page
async function redirectPage(){
    console.log("Redirecting to result page");
    window.location.href = "searchresults.html";
}

//Store recipe data retrieved
async function storeRecipe(results, input){
    //store data for all sessions, string only
    console.log("Storing recipes to local storage");
    for(let i = 0; i < results['number']; i++){
        localStorage.setItem(input+i, JSON.stringify(results['results'][i]));
    }
}

//Retrieve results from local storage
async function retrieveRecipe(input){
    console.log("Retrieving recipes from local storage");
    myStorage = window.localStorage;
    const recipe_example = myStorage.getItem(input+"0");
    console.log(recipe_example);
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
