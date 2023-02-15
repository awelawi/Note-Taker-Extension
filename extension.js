var colorParent = document.querySelector(".color");
var titleText = document.querySelector("#title_of_page")
var redButton = colorParent.querySelector("#red");
var yellowButton = colorParent.querySelector("#yellow");
var greenButton = colorParent.querySelector("#green");
var title_of_note = document.querySelector("#title_of_note")
var notes_content = document.querySelector("#freeform")
var notes_dict = {}
var saveButton = colorParent.querySelector("#save")
saveButton.addEventListener("click", onSaveButtonClicked)
window.addEventListener("resize", function () {
    document.getElementById("freeform").style.width = (window.innerWidth)/2 + "px";
    document.getElementById("freeform").style.height = (window.innerHeight)/10 + "px";
});

function setBackgroundColor () {
    titleText.style.color = "white";
}

// these changes the background color to the specified below when clicked
redButton.addEventListener("click", function(){
    document.body.style.backgroundColor = "red";
    titleText.style.color = "white";
});
yellowButton.addEventListener("click", function(){
    document.body.style.backgroundColor = "yellow";
    titleText.style.color = "white";
})
greenButton.addEventListener("click", function(){
    document.body.style.backgroundColor = "green";
    setBackgroundColor();
})

// this checks whether the title of the text is empty


// for now, user when the save button is clicked, the items should be added to a dictionary
// where the title is the key, and the content is the value
function onSaveButtonClicked(){
    // first check if the title of note or the note space is empty
    if (title_of_note.value === "" || notes_content.value === "") {
        console.log("One of the input fields is empty, please fill them out")
    }

    // if it's not empty, save to a dictionary

    notes_dict[title_of_note.value] = notes_content.value
    console.log(notes_dict)
}

// getElementIds()





