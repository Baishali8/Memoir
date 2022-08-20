const addbtn = document.querySelector("#addbtn")
const main =document.querySelector("#main")

addbtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)

const saveNotes = () =>{
    const notes=document.querySelectorAll(".note textarea");
    const data=[];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

const addNote = (text = "") =>{
    const note= document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
        <div class="tool">
            <i class="btn fas fa-plus"></i>
            <div class="opt">
                <i class="save fas fa-save"></i>
                <i class="trash fas fa-trash-alt"></i>
            </div>
        </div>
        <textarea>${text}</textarea>
    `;

    note.querySelector(".btn").addEventListener(
        "click",
        function(){
            addNote()
        }
    )
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes()
        }
    )

    main.appendChild(note);
    saveNotes()
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()