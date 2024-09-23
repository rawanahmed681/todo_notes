var titleInput= document.getElementById('title');
var descInput= document.getElementById('description');
var buttons = document.querySelectorAll('.btn1');
var doneNote = document.getElementById('doneNot');

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
function doneCheck(){
    if(doneNote.checked=="done"){
        titleInput.value.classList.add("doneNotes");
     }
}

function addNote(){
    var note = {
        title: titleInput.value,
        description: descInput.value
    }

    notesContainer.push(note);
    localStorage.setItem("notes",JSON.stringify(notesContainer));
    // console.log(note.title)
    displayNote(notesContainer);
    
    
    closeModal(); 
    console.log(notesContainer)

    clearInput()
    
}
function clearInput(){
    titleInput.value='';
    descInput.value = '';
}

buttons.forEach(button =>{
    button.onclick = function(event){
        const buttonValue = event.target.value;
    }
});
function displayNote(arr){
    var allNotes=``;
    for( var i=0; i<arr.length;i++){
        allNotes +=`
                <div class="noteContent">
                    <div class="note-head">
                        <h1 class="noteTitle">${
                            arr[i].title
                        }</h1>
                        
                        <div class="dropdown">
                       <button class="dropbtn"><i class="fa-solid fa-ellipsis">
                        </i></button>
                         <div class="dropdown-content">
                              <a href="#" onclick="setEditBtn(${i})">edit</a>
                              <button onclick="deleteNote(${i})">delete</button>
                             </div>
                        </div>
                        
                    </div>
                    <p>${arr[i].description}</p>

                    <div class="filter-input">
                    </div>
                    <div class="note-type">
                        <input type="checkbox" name="" id="doneNot" value="done" onclick="doneCheck()">
                        <label for="done" >Done</label>
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
        notesContainer[currentEditIndex].title = titleInput.value;
        notesContainer[currentEditIndex].description = descInput.value;

        localStorage.setItem("notes",JSON.stringify(notesContainer));

        displayNote(notesContainer);

        addBtn.classList.replace("dNoneAdd", "add");
        editBtn.classList.replace("dBlockEdit", "edit");

        clearInput()

        closeModal(); 

        currentEditIndex = null;
    }
}

