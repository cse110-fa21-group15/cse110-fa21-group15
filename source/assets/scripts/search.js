const API_KEY = "apiKey=818daa16f8f44a6790d7e444c55f92b8";
const API_KEY_ALT = "apiKey=eb8f87242ae8478f9dc126f96c50fda0"

//get recipes by searched keywords from database 
async function getRecipes(event, filters = false, number = 8, offset = 0, currsize = 0, recurse = 0){    
    var input = document.querySelector("input[name = 'search']").value;                 
    if (input == "") {
        return;
    }
    var url = "https://api.spoonacular.com/recipes/complexSearch?"+API_KEY_ALT +"&query=" + input + "&number="+(number*3)+ "&instructionsRequired=true&addRecipeInformation=true&offset=" + offset;
    if(filters == true)
    {
        var time = document.getElementById("time").value;
        var dietary = document.getElementById("dietary").value;
        if(time != "-1"){
            url+= ("&maxReadyTime=" + time);
        }
        if(dietary != "-1"){
            url+= ("&diet=" + dietary);
        }
    }
    // getData(url).then(x => alert(x));
    const fetchPromise = fetch(url);
    const final = fetchPromise.then(response => {
        return response.json();
    }).then(results => {
        //storeRecipe(results, input);    
        var recipes = results['results'];    
        var output = [];
        if(filters == true){
            var cost = document.getElementById("cost").value;
            output =  filterCost(recipes, Number(cost));
        }
        else{
            output = recipes;
        }
        return output;
    })
    if(event != undefined){
        event.preventDefault();
    }
    var real = await final;
    if(recurse == 5){
        return real.slice(0, number);
    }
    if(real.length + currsize < number){
        var temp = await getRecipes(event,filters, number, offset+number, (currsize +real.length), recurse + 1);
        real = real.concat(temp);
    }
    
    //redirectPage();
    //retrieveRecipe(input);
    return real.slice(0, number);
}

function filterCost(recipes, cost){
    if(cost == "-1"){
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
