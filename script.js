var titleInput= document.getElementById('title');
var descInput= document.getElementById('description');
var buttons = document.querySelectorAll('.btn1');
var doneNote = document.querySelectorAll('.done-check');
var validatError = document.getElementById('errorAlert');
var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');




var notesContainer = [];
if(localStorage.getItem("notes")!= null){
    notesContainer= JSON.parse(localStorage.getItem("notes"));
    displayNote(notesContainer);
}


function displayModal(){
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
function closeModal(){
    modal.style.display = "none";
}

function addNote(){

    // validatError.style.display= "none";

        var selectedTags = buttonValues; 
    
        var note = {
            title: titleInput.value,
            description: descInput.value,
            tags: selectedTags
        }
        notesContainer.push(note);
    localStorage.setItem("notes",JSON.stringify(notesContainer));
    // console.log(note.title)
    displayNote(notesContainer);

    closeModal(); 
    console.log(notesContainer)

    clearInput()
    buttonValues = [];
  

    
}
function clearInput(){
    titleInput.value='';
    descInput.value = '';
}

// document.addEventListener('DOMContentLoaded', function() {
//     // Make sure the elements are found
//     if (doneNote && notesContainer) {
//         function doneCheck() {
//             if (doneNote.checked) { // If checkbox is checked
//                 notesContainer.title.classList.add("done-Notes"); // Add the class
//             } else {
//                 notesContainer.title.classList.remove("done-Notes"); // Remove the class if unchecked
//             }
//         }

//         // Add event listener to the checkbox to trigger the function when the checkbox state changes
//         doneNote.addEventListener('change', doneCheck);
//     } else {
//         console.error('Elements not found');
//     }
// });

function doneCheck(index) {

                if (doneNote.checked ==true) { // If checkbox is checked
                    notesContainer[index].title.classList.add("done-Notes"); // Add the class
                    console.log(index);
                }

                //  else {
                //     notesContainer[index].title.classList.remove("done-Notes"); // Remove the class if unchecked
                // }
            }

var buttonValues = []; 

buttons.forEach(button => {
    button.onclick = function(event) {
        const value = event.target.value;
console.log("buttonValues",value)
        if (buttonValues.includes(value)) {
            buttonValues = buttonValues.filter(v => v !== value); // Remove if already selected
        } else {
            buttonValues.push(value); 
        }

        console.log(buttonValues);
    };
});
function displayNote(arr){
    var allNotes=``;
    for( var i=0; i<arr.length;i++){
        let tags = arr[i].tags ? arr[i].tags : []; 
        allNotes +=`
                <div class="note-Content">
                    <div class="note-head">
                        <h1 class="noteTitle">${
                            arr[i].title
                        }</h1>
                        
                        
                        <div class="dropdown">
                       <button class="dropbtn"><span>...</span>
                        </button>
                         <div class="dropdown-content">
                              <a href="#" onclick="setEditBtn(${i})">Edit</a>
                              <button onclick="deleteNote(${i})">Delete</button>
                             </div>
                        </div>
                        
                    </div>
                    <div class="note-paragraph">
                    <p>${arr[i].description}</p>
                    </div>
                    

                    <div class="filter-input">
                    
                    
                     <div class="note-tag">
                    ${arr[i].tags}
                     </div>
                    <div class="note-type">
                        <input type="checkbox" name="done" class="done-check" value="done" onclick="doneCheck(${i})">
                        <label for="done" >Done</label>
                    </div>
                    </div>
                </div>
            
        `
        document.getElementById('notecontent').innerHTML= allNotes;

    
       
    }
   
}

function deleteNote(noteIndex){

    if(noteIndex == 0){
        notesContainer.splice(noteIndex,1);
        localStorage.setItem("notes",JSON.stringify(notesContainer));
        document.getElementById('notecontent').innerHTML= ``;

    }
    else{
        notesContainer.splice(noteIndex,1);

    localStorage.setItem("notes",JSON.stringify(notesContainer));

    displayNote(notesContainer);
  console.log(notesContainer);
    
    }
    
}


function searchNote(word){
   var matchedNotes=[];
    for(var i=0; i<notesContainer.length;i++){

        if(notesContainer[i].title.toLowerCase().includes(word.toLowerCase()) ==true || 
            notesContainer[i].description.toLowerCase().includes(word.toLowerCase()) == true){

            matchedNotes.push(notesContainer[i]);
            
        }
    }
    console.log(i);
    displayNote(matchedNotes);
}

function filterNotesType(value){
    var filteredNotes = [];
    
    for(var i=0; i<notesContainer.length ;i++){
    

        if(notesContainer[i].tags.includes(value)){
        

            filteredNotes.push(notesContainer[i])
            // filteredNotes=[];
            // displayNote(filteredNotes);
    }
    console.log(i);
    displayNote(filteredNotes);
}}

var currentEditIndex = null;

function setEditBtn(index){

    addBtn.classList.replace("add","dNoneAdd");
    editBtn.classList.replace("edit","dBlockEdit")
    displayModal()
    titleInput.value = notesContainer[index].title;
    descInput.value = notesContainer[index].description;

    currentEditIndex = index;

}
function getEditBtn(){

    if(currentEditIndex!= null){
        var selectedTags = buttonValues;

        notesContainer[currentEditIndex].title = titleInput.value;
        notesContainer[currentEditIndex].description = descInput.value;
        notesContainer[currentEditIndex].tags = selectedTags;

        localStorage.setItem("notes",JSON.stringify(notesContainer));

        displayNote(notesContainer);

        addBtn.classList.replace("dNoneAdd", "add");
        editBtn.classList.replace("dBlockEdit", "edit");

        clearInput()

        closeModal(); 

        buttonValues = [];

        currentEditIndex = null;
    }
}

