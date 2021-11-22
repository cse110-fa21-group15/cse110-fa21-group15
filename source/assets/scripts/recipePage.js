Recipepage.js
//Grab edit button
const editBtn = document.querySelector("#edit");
console.log(editBtn);

//Send data from recipe page to upload recipe page
editBtn.addEventListener("click", function(){
//Get recipe ingredients
    let recipeIngredients = document.querySelectorAll("#recipeIngredients li");
    console.log(recipeIngredients);
    let recipeIngredientsList = [];
    if(recipeIngredients.length > 0){
        for(let i = 0; i < recipeIngredients.length; ++i){
         recipeIngredientsList[i] = recipeIngredients[i].textContent;
         }
    }

    //Get recipe steps
    let recipeSteps = document.querySelectorAll("#recipeList li");
    console.log(recipeSteps);
    let recipeStepsList = [];
    if(recipeSteps.length > 0){ 
        for(let i = 0; i < recipeSteps.length; ++i){
            recipeStepsList[i] = recipeSteps[i].textContent;
        }
    }

    let recipeName = document.querySelector("#recipeName");
    sessionStorage.setItem("recipeName",recipeName.textContent);

    let recipeImage = document.querySelector("#recipeImage");
    sessionStorage.setItem("recipeImage",recipeImage.getAttribute('src'));

    let recipeTime = document.querySelector("#recipeTime");
    sessionStorage.setItem("recipeTime",recipeTime.textContent);

    let recipeCost = document.querySelector("#recipeCost");
    sessionStorage.setItem("recipeCost",recipeCost.textContent);

    let recipeServings = document.querySelector("#recipeServings");
    sessionStorage.setItem("recipeServings",recipeServings.textContent);

    let recipeDescription = document.querySelector("#recipeDescription");
    sessionStorage.setItem("recipeDescription",recipeDescription.textContent);

    localStorage.ingredients = JSON.stringify(recipeIngredientsList);
    
    localStorage.steps = JSON.stringify(recipeStepsList);

    location.href = "recipeUpload.html";
})
