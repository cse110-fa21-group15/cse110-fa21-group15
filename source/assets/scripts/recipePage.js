//Grab edit button
const editBtn = document.querySelector(".edit");
console.log(editBtn);
let recipeIngredients = document.querySelectorAll("#recipeIngredients li");
console.log(recipeIngredients);
let recipeIngredientsList = [];
for(let i = 0; i < recipeIngredients.length; ++i){
    recipeIngredientsList[i] = recipeIngredients[i].textContent;
}
console.log(recipeIngredientsList);

//Send data from recipe page to upload recipe page
editBtn.addEventListener("click", function(){
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

    sessionStorage.setItem("recipeIngredients",recipeIngredientsList);

    /*let recipeSteps = document.querySelector("#recipeSteps");
    sessionStorage.setItem("recipeSteps",recipeSteps.textContent);*/

    location.href = "recipeUpload.html";
})