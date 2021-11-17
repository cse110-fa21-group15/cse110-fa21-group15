const API_KEY = "apiKey=818daa16f8f44a6790d7e444c55f92b8";

//get recipes by searched keywords from database 
async function getRecipes(event){
    console.log("button clicked");
    var forms = document.forms;
    var input = "";                 
    input = forms.searchbar.search.value;
    if (input == "") {
        return;
    }
    var url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=818daa16f8f44a6790d7e444c55f92b8&query=" + input + "&number=8&instructionsRequired=true&addRecipeInformation=true";
    // getData(url).then(x => alert(x));
    const fetchPromise = fetch(url).then(response => {
        return response.json();
    }).then(results => {
        storeRecipe(results, input);
        console.log(JSON.stringify(results['results'][0]));
    })
    event.preventDefault();
    //redirectPage();
    //retrieveRecipe(input);
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
