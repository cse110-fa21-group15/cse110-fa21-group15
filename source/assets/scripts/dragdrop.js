function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("target",ev.target);
    console.log("sender  src",document.getElementById(data).src);
    ev.target.src = document.getElementById(data).src;
    
    //ev.target.appendChild(DOM_img);
   //ev.target.appendChild(document.getElementById(data));
}