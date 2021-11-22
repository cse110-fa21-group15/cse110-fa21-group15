const personalCookbook = document.querySelector("#personalCookbook");

personalCookbook.addEventListener("click", function(){
    sessionStorage.setItem("recipeName","");

    sessionStorage.setItem("recipeImage","assets/images/oldUpload.png");

    sessionStorage.setItem("recipeTime", "");

    sessionStorage.setItem("recipeCost", "");

    sessionStorage.setItem("recipeServings", "");

    sessionStorage.setItem("recipeDescription", "");

    localStorage.ingredients = JSON.stringify("");
    
    localStorage.steps = JSON.stringify("");
})