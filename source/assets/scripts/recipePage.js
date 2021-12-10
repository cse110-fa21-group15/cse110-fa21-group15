// Grab edit button
const editBtn = document.querySelector("#edit");

// Send data from recipe page to upload recipe page
editBtn.addEventListener("click", function() {
    // Get recipe ingredients
    let recipeIngredients = document.querySelectorAll("#recipeIngredients li");
    let recipeIngredientsList = [];
    if (recipeIngredients.length > 0) {
        for (let i = 0; i < recipeIngredients.length; i++) {
            recipeIngredientsList[i] = recipeIngredients[i].textContent;
        }
    }

    // Get recipe steps
    let recipeSteps = document.querySelectorAll("#recipeList li");
    let recipeStepsList = [];
    if (recipeSteps.length > 0) { 
        for (let i = 0; i < recipeSteps.length; i++) {
            recipeStepsList[i] = recipeSteps[i].textContent;
        }
    }

    /**
     * Recursively search for a key nested somewhere inside an object
     * @param {Object} object the object with which you'd like to search
     * @param {String} key the key that you are looking for in the object
     * @returns {string} the value of the found key
     */
    function searchForKey(object, key) {
        var value;
        Object.keys(object).some(function (k) {
            if (k === key) {
                value = object[k];
                return true;
            }
            if (object[k] && typeof object[k] === "object") {
                value = searchForKey(object[k], key);
                return value !== undefined;
            }
        });
        return value;
    }

    let recipeName = document.querySelector("#recipeName");
    sessionStorage.setItem("recipeName",recipeName.textContent);

    let recipeImage = document.querySelector("#recipeImage");
    sessionStorage.setItem("recipeImage",recipeImage.getAttribute("src"));

    let recipeTime = document.querySelector("#recipeTime");
    sessionStorage.setItem("recipeTime",recipeTime.textContent);

    let recipeCost = document.querySelector("#recipeCost");
    sessionStorage.setItem("recipeCost",recipeCost.textContent);

    let recipeServings = document.querySelector("#recipeServings");
    sessionStorage.setItem("recipeServings",recipeServings.textContent);

    let recipeDescription = document.querySelector("#recipeDescription");
    sessionStorage.setItem("recipeDescription",recipeDescription.textContent);

    let recipe = JSON.parse(localStorage.recipe);

    let recipe_id = searchForKey(recipe, "recipe_id");
    sessionStorage.setItem("recipe_id", recipe_id);
    
    localStorage.ingredients = JSON.stringify(recipeIngredientsList);
    
    localStorage.steps = JSON.stringify(recipeStepsList);

    location.href = "recipeUpdate.html";
});