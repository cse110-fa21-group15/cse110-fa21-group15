let favoriteBtn = document.querySelector("#favorite");
let favoriteRecipesList = JSON.parse(localStorage.favoriteRecipes)
console.log(favoriteRecipesList);

let recipe = JSON.parse(localStorage.recipe);
console.log(recipe);

for(let i = 0; i < favoriteRecipesList.length; ++i){
    if(favoriteRecipesList[i].recipe_id == recipe.recipe_id){
        favoriteBtn.setAttribute("src","assets/images/FavoriteFilled.png");
        break;
    }
}


