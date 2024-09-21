var titleInput= document.getElementById('title');
var descInput= document.getElementById('description');

var notesContainer = [];


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
    var note = {
        title: titleInput.value,
        description: descInput.value
    }
    notesContainer.push(note);

    // console.log(note.title)
    displayNote(notesContainer);
}
function displayNote(notesContainer){
    var allNotes=``;
    for( var i=0; i<notesContainer.length;i++){
        allNotes +=`
                <div class="note-content">
                    <div class="note-head">
                        <h1>${notesContainer[i].title}</h1>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                    <p>${notesContainer[i].description}</p>
                    <div class="note-type">
                        <input type="checkbox" name="" id="done">
                        <label for="done">Done</label>
                    </div>
                </div>
            
        `
        document.getElementById('notecontent').innerHTML= allNotes;
    }
}
console.log(notesContainer)