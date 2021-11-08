//search recipes
document.getElementById('search').addEventListener("click", getRecipe);

function getSource(id){
    let input = document.getElementById('search').value;
    $.ajax({
        url:"https://api.spoonacular.com/recipes/" + id +"/information?apiKey=d97a6e5c0e914bed85a619b32c3aa047",
        success:function(response){
            document.getElementById("sourceLink").innerHTML=response.sourceUrl;
            document.getElementById("sourceLink").href=response.sourceUrl;
        }
    })
}

function getRecipe(){
    let input = document.getElementById('search').value;
    $.ajax({
        url:"https://api.spoonacular.com/recipes/complexSearch?apiKey=d97a6e5c0e914bed85a619b32c3aa047&query="+input,
        success:function(response){
            document.getElementById("img-output").src=response.baseUrl+response.results[o].image;
            getSource(response.results[0].id);
        }
    })
}
