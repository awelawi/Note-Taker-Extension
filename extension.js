var colorParent = document.querySelector(".color");
var titleText = document.querySelector("#title_of_page")
var redButton = colorParent.querySelector("#red");
var yellowButton = colorParent.querySelector("#yellow");
var greenButton = colorParent.querySelector("#green");
var title_of_note = document.querySelector("#title_of_note")
var notes_content = document.querySelector("#freeform")
var tabName = document.title;
const date = new Date();
myNotes = []
// Get a reference to the table
var table = document.querySelector('table');
var saveButton = colorParent.querySelector("#save")


// creates a dictionary for the notes inc title and notes
var notes_dict = {
    title : "",
    notes : ""
}

// this event listener listens to click event of the button, and calls the onSaveButtonCClicked
// method
saveButton.addEventListener("click", onSaveButtonClicked)
// this eventlistener listens fior whenever the webpage is resized and adjusts the textboxes and tables
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

// TODO: Instead of saving text to dict, I will save it to the local storage even the tab of the page
function onSaveButtonClicked(){
    // first check if the title of note or the note space is empty
    if (title_of_note.value === "" || notes_content.value === "") {
        console.log("One of the input fields is empty, please fill them out")
        return
    }

    // if it's not empty, save to a dictionary

    notes_dict.title = title_of_note.value
    console.log(typeof(notes_dict.title))
    notes_dict.notes = notes_content.value
    addtoStorage()
}

// // if the leadsstorage aint empty
// // then set my leads to the leadstorage
// // which has all the leads up to this point
// if (leadsFromLocalStorage) {
//     myNotes = leadsFromLocalStorage
//     render(myNotes)
// }

// add to storage creates an object variable that contains
// all the notes information
i = 0
function addtoStorage(){
    
    const NotesInfo = {
        tabNameCell: tabName,
        titleCell: notes_dict.title,
        notesCell: notes_dict.notes,
        dateCell: date
    }
    myNotes.push(NotesInfo)
    window.localStorage.setItem("myNotes", JSON.stringify(myNotes))
    render(myNotes)
    title_of_note.value = "";
    notes_content.value = "";
}

const notesFromLocalStorage = JSON.parse(window.localStorage.getItem("myNotes"))

if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage

    render(myNotes)
}
// render should add notes to the table
function render (notes) {
    for(let i = 0; i < notes.length; i++){
        var newRow = table.insertRow();
        var tabNameCell = newRow.insertCell();
        var titleCell = newRow.insertCell();
        var notesCell = newRow.insertCell();
        var dateCell = newRow.insertCell();
        var object_test = notes[i]
        titleCell.textContent = notes[i].titleCell;
        notesCell.textContent = notes[i].notesCell
        console.log(notes[i].notesCell)
        tabNameCell.textContent = notes[i].tabNameCell
        dateCell.textContent = notes[i].dateCell;
    }
}