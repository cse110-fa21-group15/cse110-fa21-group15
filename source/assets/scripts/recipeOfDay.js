function newDay() {
    var date = new Date().toLocaleDateString();
    // Setting our app's date
    if (!localStorage.currDate || !localStorage.recipeOfDay) {
        localStorage.currDate = date;
        return true;
    }
    if (localStorage.currDate === date) {
        return false;
    }
    localStorage.currDate = date;
    return true;
}

// Storing recipe of the day in the localstorage
async function recipeOfTheDay() {
    var recipe = await randomRecipe();
    localStorage.recipeOfDay = JSON.stringify(recipe);
}

async function initDaily() {
    if (newDay()) {
        await recipeOfTheDay();
    }

    var daily = document.getElementById("recipeOfDay");
    (daily.querySelector("img")).src = JSON.parse(localStorage.recipeOfDay).image;
    (daily.querySelector("div")).textContent = JSON.parse(localStorage.recipeOfDay).title;
    daily.addEventListener("click", () => {
        localStorage.recipe = localStorage.recipeOfDay;
        localStorage.extraRecipeInfo = localStorage.recipeOfDay;
        window.location.href = "recipePageSpoonacular.html";
    });
}

initDaily();