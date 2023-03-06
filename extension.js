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


var notes_dict = {
    title : "",
    notes : ""
}
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
function addtoStorage(){
    
    const NotesInfo = {
        tabNameCell: tabName,
        titleCell: notes_dict.title,
        dateCell: date,
        notesCell: notes_dict.notes
    }

    // we have to convert this object to a string for it to be saved in the storage
    window.localStorage.setItem(myNotes, JSON.stringify(NotesInfo))
    console.log(window.localStorage.getItem(myNotes))
    render(myNotes)
    title_of_note.value = "";
    notes_content.value = "";
}
function render (notes) {
    // Create a new row dynamically

    // somehow notes is empty hm
    console.log(window.localStorage.getItem(notes))
    console.log(notes.length)
    // notes is an object string not an array, so it has a length of 0
    // first we need to convert it back to an object
    const leadsFromLocalStorage = JSON.parse(localStorage.getItem(notes))
    console.log(leadsFromLocalStorage)
    if(leadsFromLocalStorage.length > 0){
    for(let i = 0; i < leadsFromLocalStorage.length; i++){
        var newRow = table.insertRow();

        // Add cells to the row
        var tabNameCell = newRow.insertCell();
        var titleCell = newRow.insertCell();
        var dateCell = newRow.insertCell();
        var notesCell = newRow.insertCell();
        console.log(notes)
        tabNameCell = leadsFromLocalStorage[i];
        console.log(tabNameCell)
        // titleCell = notes[i].titleCell;
        // dateCell = notes[i].dateCell;
        // notesCell = notes[i].notesCell

    }
    
    }
    // Set the cell values in the object var NotesInfo
    

    
    // // sort the rows in descending order based on the date column
    // var table_size = document.getElementById("table").rows.length;

    // if (table_size > 0){
    //     var rows = Array.from(document.querySelector("tbody").querySelectorAll("tr"));

    //     rows.sort(function (a, b) {
    //         if (table_size > 1){
    //             var dateA = new Date(a.querySelector("#date").textContent);
    //             var dateB = new Date(b.querySelector("#date").textContent);
    //             return dateB - dateA;

    //         }

    //         else{
    //             return
    //         }
            
    //     });
    //     }

    // // remove all rows from the table body
    // var tbody = document.querySelector("tbody");
    // while (tbody.firstChild) {
    //     tbody.removeChild(tbody.firstChild);
    // }

    // // insert the sorted rows back into the table body in the correct order
    // rows.forEach(function (row) {
    //     tbody.appendChild(row);
    // });

    // prev code
    // dateCell.textContent = date;
    // notesCell.textContent = notes_dict.notes;
    // notes_dict = {};
    // title_of_note.value = "";
    // notes_content.value = "";

    // notes_dict = {};
    // title_of_note.value = "";
    // notes_content.value = "";
}

// write now, I need code that will collect these 
// items, save it to the local storage, and render it once the table is reloaded





