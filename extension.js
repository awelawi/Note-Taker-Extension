var colorParent = document.querySelector(".color");
var titleText = document.querySelector("#title_of_page")
var redButton = colorParent.querySelector("#red");
var yellowButton = colorParent.querySelector("#yellow");
var greenButton = colorParent.querySelector("#green");
var title_of_note = document.querySelector("#title_of_note")
var notes_content = document.querySelector("#freeform")
var tabName = document.title;
const date = new Date();
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
    notes_dict.notes = notes_content.value
    render(notes_dict)

}
function sortByDate(rows){
    // get an array of all the rows in the table body
    // To clarify, when the sort method is called on an array, it loops through all the elements in the array and compares adjacent pairs of elements. In our case, each element in the array is a row in the table, and the sort method compares the date values in the rows to determine their relative order.
    // So, to be more accurate, a and b represent adjacent rows in the rows array that are 
    // being compared.The sort method will continue comparing adjacent rows until all the rows 
    // have been sorted in the correct order.

    // sort the rows in descending order based on the date column
    rows.sort(function (a, b) {
        var dateA = new Date(a.querySelector("#date").textContent);
        var dateB = new Date(b.querySelector("#date").textContent);
        return dateB - dateA;
    });
    console.log("y")

}

function render (notes_dict) {
    // Create a new row dynamically
    var newRow = table.insertRow();

    // Add cells to the row
    var tabNameCell = newRow.insertCell();
    var titleCell = newRow.insertCell();
    var dateCell = newRow.insertCell();
    var notesCell = newRow.insertCell();

    // Set the cell values
    tabNameCell.textContent = tabName;
    titleCell.textContent = notes_dict.title;
    dateCell.textContent = date;
    notesCell.textContent = notes_dict.notes;
    notes_dict = {};
    title_of_note.value = "";
    notes_content.value = "";

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
}





