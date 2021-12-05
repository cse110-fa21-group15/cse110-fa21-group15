function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target);
    console.log(document.getElementById(data).src);
    ev.target.src = document.getElementById(data).src;
    //ev.target.appendChild(DOM_img);
   //ev.target.appendChild(document.getElementById(data));
}