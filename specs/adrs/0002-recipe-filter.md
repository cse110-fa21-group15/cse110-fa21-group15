# Types of Filters

## Context and Problem Statement

We want to allow users to filter the recipes so that they can look for the recipes they want easily.
What types of filters should we add?

## Considered Options

* Type of cuisine
* Time
* Cost
* Meal of the day (Breakfast/Lunch/Dinner)
* Dietary restrictions (Vegan/Keto/Gluten-free/...)
* Main ingredient (Chicken/Fish/Beef/...)

## Decision Outcome

Chosen option: Time, Cost, Dietary, Ingredient, because

* [ ] Type of cuisine: Not relevant to our target audience because they just want to make simple meals
* [x] Time: It is important information when deciding whether to make recipe, especially to our target audience (college students that want to make a simple meal)
* [x] Cost: Users should know how much the recipe costs, especially for our target audience
* [ ] Meal of the day: Information not provided by Spoonacular API 
* [x] Dietary restrictions: We want to our users to know that their restrictions are being considered
* [x] Main ingredient: It is the most common criteria users would filter by
