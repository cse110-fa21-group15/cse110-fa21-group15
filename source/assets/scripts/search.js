const API_KEY = "apiKey=818daa16f8f44a6790d7e444c55f92b8";

function getRecipes(){
    var forms = document.forms;
    var input = "";                 
    input = forms.searchbar.search.value;
    var url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=818daa16f8f44a6790d7e444c55f92b8&query=pasta&number=2";
    getData(url).then(x => alert(x));
    
}

async function getData(url){
    var response = (await fetch(url));
    return response.json();
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
