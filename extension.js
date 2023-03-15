// Line 2-10 defines all the elements that are manipulated by the javascript
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

// setBackgroundColor sets the background color of the page to whie
function setBackgroundColor () {
    titleText.style.color = "white";
}

// these eventlisteners changes the background color to the specified below when clicked
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

// onSaveButtonClicked is responsible for saving the note title and content whenever entered
function onSaveButtonClicked(){
    // first check if the title of note or the note space is empty
    // in the future, we would want this to be highlighted with a prompt that says
    // one of the input fields is empty
    if (title_of_note.value === "" || notes_content.value === "") {
        console.log("One of the input fields is empty, please fill them out")
        return
    }

    notes_dict.title = title_of_note.value
    notes_dict.notes = notes_content.value
    addtoStorage()
}

// addToStorage saves the new note to the localStorage
function addtoStorage(){
    const NotesInfo = {
        tabNameCell: tabName,
        titleCell: notes_dict.title,
        notesCell: notes_dict.notes,
        dateCell: date
    }
    myNotes.push(NotesInfo)
    window.localStorage.setItem("myNotes", JSON.stringify(myNotes))
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
        var notes_object = notes[i]
        console.log(notes_object)
        // Assuming "table" is a reference to the <table> element
        var newRow = document.createElement("tr");
        // Create a new cell for the tabs text
        var tabNameCell = document.createElement("td");
        var tabNameText = document.createTextNode(notes_object.tabNameCell);
        tabNameCell.appendChild(tabNameText);

        // Create a new cell for the title text
        var titleCell = document.createElement("td");
        var titleText = document.createTextNode(notes_object.titleCell);
        titleCell.appendChild(titleText);

        // Create a new cell for the note text
        var noteCell = document.createElement("td");
        var noteText = document.createTextNode(notes_object.notesCell);
        noteCell.appendChild(noteText);

        // Create a new cell for the save date
        var dateCell = document.createElement("td");
        var dateText = document.createTextNode(notes_object.dateCell);
        dateCell.appendChild(dateText);

        // Sets the values of the table cell
        tabNameCell.textContent = notes_object.tabNameCell;
        titleCell.textContent = notes_object.titleCell;
        noteCell.textContent = notes_object.notesCell;
        dateCell.textContent = notes_object.dateCell;

        newRow.appendChild(tabNameCell);
        newRow.appendChild(titleCell);
        newRow.appendChild(noteCell);
        newRow.appendChild(dateCell);

        // Append the new row to the table
        table.appendChild(newRow);
    }
}