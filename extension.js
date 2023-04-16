var chrome = window.chrome;
var current_tab = document.getElementById("current_tab") 
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    // this retrieves the tab_name
    const tab_name = tabs[0];
    // this retrieves the tab_name url
    const tab_name_url = tab_name.url
    document.getElementById("tab_name_link").href = tab_name_url;

})

// Line 2-10 defines all the elements that are manipulated by the javascript
var colorParent = document.querySelector(".color");
var titleText = document.querySelector("#title_of_page")
var redButton = colorParent.querySelector("#red");
var yellowButton = colorParent.querySelector("#yellow");
var greenButton = colorParent.querySelector("#green");
var title_of_note = document.querySelector("#title_of_note")
var notes_content = document.querySelector("#freeform")
const date = new Date();
myNotes = []
var notes_table = document.querySelector('table');
var saveButton = colorParent.querySelector("#save")
// var deleteButton = colorParent.querySelector("#delete")
var modal_box = document.querySelector(".modal")
var modal_close = modal_box.querySelector("#close_btn")
var modal_note = modal_box.querySelector("#note-content")
var modal_title = modal_box.querySelector("#note-title")
var modal_date  = modal_box.querySelector("#date_of_note")
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
    // in the future, we would want the input fields that are empty to be temporarily highlighted
    if (title_of_note.value === "" || notes_content.value === "") {
        console.log("One of the input fields is empty, please fill them out")
        alert("One of the input fields is empty")
        return
    }

    notes_dict.title = title_of_note.value
    notes_dict.notes = notes_content.value
    addtoStorage()
}

// addToStorage saves the new note to the localStorage
function addtoStorage(){
    const NotesInfo = {
        tabNameCell: current_tab,
        titleCell: notes_dict.title,
        notesCell: notes_dict.notes,
        dateCell: date.toDateString()
    }
    myNotes.push(NotesInfo)
    window.localStorage.setItem("myNotes", JSON.stringify(myNotes))
    title_of_note.value = "";
    notes_content.value = "";
    render(myNotes)
}

// obtains the notes from the local storage
const notesFromLocalStorage = JSON.parse(window.localStorage.getItem("myNotes"))
if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage

    render(myNotes)
}

// render should add notes  to the table
function render (notes) {
    notes_table.innerHTML = ""; // Clear existing rows
    for(let i = 0; i < notes.length; i++){
        var notes_object = notes[i]
        var newRow = document.createElement("tr");
        // assigning an id to the row
        newRow.setAttribute("data-id", i)
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
        console.log(tabNameCell)
        titleCell.textContent = notes_object.titleCell;
        // Only show the first 50 characters of the notes text
        noteCell.textContent = notes_object.notesCell.substring(0, 100) + "...";
        noteCell.setAttribute("data-fullnotes", notes_dict.notes); // Set the full notes text as a data attribute
        dateCell.textContent = notes_object.dateCell;
        newRow.appendChild(tabNameCell);
        newRow.appendChild(titleCell);
        newRow.appendChild(noteCell);
        newRow.appendChild(dateCell);

        // Append the new row to the table
        notes_table.appendChild(newRow);
    }
    // window.location = window.location
    // window.location.reload();


}

// this method adds an event listener to the notes_table
// creates a modal dialog box with the notes in full display
notes_table.addEventListener("click", function(event){
    const row = event.target.closest("tr")
    if (row){
        const noteId = row.getAttribute("data-id"); // Get the unique identifier
        var note = getNotesContent(noteId)
        document.getElementById('modal').style.display = 'block';
        console.log(note.notesCell)
        modal_note.innerText = note.notesCell
        modal_title.innerText = note.titleCell
        modal_date.innerText = note.dateCell

    }
})

// this method returns the notes at the specified row id
function getNotesContent(noteId){
    var note = myNotes[noteId]
    return note

}

// this function blurs out the table
var myBlurFunction = function (state) {
    /* state can be 1 or 0 */
    var containerElement = document.getElementById('main_container');
    var overlayEle = document.getElementById('overlay');

    if (state) {
        overlayEle.style.display = 'block';
        containerElement.setAttribute('class', 'blur');
    } else {
        overlayEle.style.display = 'none';
        containerElement.setAttribute('class', null);
    }
};
// this hids the modal dialog box when clicked
modal_box.addEventListener("click", function(event){
    modal_box.style.display = "none"
})
modal_close.addEventListener("click", function(event){
    modal_box.style.display = "none"
})