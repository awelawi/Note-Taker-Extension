window.addEventListener("resize", function () {
    document.getElementById("freeform").style.width = (window.innerWidth)/2 + "px";
    document.getElementById("freeform").style.height = (window.innerHeight)/10 + "px";
});
var colorParent = document.querySelector(".color");
console.log(colorParent)
function onBackgroundButtonClicked (element_name) {
    if(element_name.id === "red"){
        console.log(element_name)
        document.body.style.backgroundColor = "red";
    }

    else if(element_name.id === "green"){
        document.body.style.backgroundColor = "green";
    }

    else{
        document.body.style.backgroundColor = "yellow";

    }
}
var redButton;
var yellowButton;
var greenButton;
function getElementIds(){
    redButton = colorParent.querySelector("#red")
    redButton.addEventListener("click", onBackgroundButtonClicked(redButton));
    yellowButton = colorParent.querySelector("#yellow")
    yellowButton.addEventListener("click", onBackgroundButtonClicked(yellowButton));
    greenButton = colorParent.querySelector("#green") 
    greenButton.addEventListener("click", onBackgroundButtonClicked(greenButton));

}

// getElementIds()





