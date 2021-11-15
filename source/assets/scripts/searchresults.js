let body = document.getElementsByTagName("section")[0];

for (let i = 1; i <= 8; i++) {
  let recipeButton = document.createElement("button");
  body.appendChild(recipeButton);
  recipeButton.addEventListener ("click", function() {
    alert(this.innerHTML);
  });
}


