# Spoonacular filters
## Context and Problem Statement

Figuring out how we want to use user specific filters on the recipes when using the search query from Spoonacular.

## Considered Options

* Enter ingredients
* List Keto/Vegetarian/gluten
* List amount of time
* Exclude a specific ingredient

## Decision Outcome

Chosen options:

* List Keto/Vegetarian/gluten
* List amount of time

* We chose these two options because excluiding specific ingredients may be too much for our code to handle and it might lead to some bugged API calls from Spoonacular. Keto/Vegetarian/gluten is a better choice for the simplicity and usability of the site for those popular diets.
