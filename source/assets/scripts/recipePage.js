//Grab edit button
const editBtn = document.querySelector(".edit");
console.log(editBtn);

//Send data from recipe page to upload recipe page
editBtn.addEventListener("click", function(){
    let recipeName = document.querySelector("#recipeName");
    sessionStorage.setItem("recipeName",recipeName.textContent);

    let recipeImage = document.querySelector("#recipeImage");
    sessionStorage.setItem("recipeImage",recipeImage.textContent);

    let recipeTime = document.querySelector("#recipeTime");
    sessionStorage.setItem("recipeTime",recipeTime.textContent);

    let recipeCost = document.querySelector("#recipeCost");
    sessionStorage.setItem("recipeCost",recipeCost.textContent);

    let recipeServings = document.querySelector("#recipeServings");
    sessionStorage.setItem("recipeServings",recipeServings.textContent);

    let recipeDescription = document.querySelector("#recipeDescription");
    sessionStorage.setItem("recipeDescription",recipeDescription.textContent);

    /*let recipeIngredients = document.querySelector("#recipeIngredients");
    sessionStorage.setItem("recipeIngredients",recipeIngredients.textContent);

    let recipeSteps = document.querySelector("#recipeSteps");
    sessionStorage.setItem("recipeSteps",recipeSteps.textContent);*/

    location.href = "recipeUpload.html";
})