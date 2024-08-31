const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const labelColorCircles = document.querySelectorAll('.color-circle');

let selectedLabelColor = '';

// handle note addition
function addNotes() {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    if (addText.value === '') {
        alert('Add your note');
        return;
    }

    const noteObj = {
        title: addTitle.value,
        text: addText.value,
        label: selectedLabelColor
    };

    addTitle.value = '';
    addText.value = '';
    selectedLabelColor = '';
    labelColorCircles.forEach(circle => circle.classList.remove('selected'));

    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

// to display notes
function showNotes() {
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }

    for (let i = 0; i < notes.length; i++) {
        notesHTML += `<div class="note">
            <button class="editNote" id=${i} onclick="editNote(${i})">Edit</button>
            <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
            <span class="title"><strong>${notes[i].title === "" ? 'Note' : notes[i].title}</strong></span>
            <div class="text">${notes[i].text}</div>
            ${notes[i].label ? `<div class="selected-color-circle" style="background-color: ${notes[i].label};"></div>` : ''}
        </div>`;
    }
    notesDiv.innerHTML = notesHTML;
}

// to handle note deletion
function deleteNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

// to handle note editing
function editNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    addTitle.value = notes[ind].title;
    addText.value = notes[ind].text;
    selectedLabelColor = notes[ind].label;
    labelColorCircles.forEach(circle => {
        if (circle.getAttribute('data-color') === selectedLabelColor) {
            circle.classList.add('selected');
        } else {
            circle.classList.remove('selected');
        }
    });
    deleteNote(ind);
}

// Handle label color selection
labelColorCircles.forEach(circle => {
    circle.addEventListener('click', function() {
        labelColorCircles.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedLabelColor = this.getAttribute('data-color');
    });
});

// Handle Ctrl+Enter key press to add note
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        addNotes();
    }
});

// Add note on button click
addNoteButton.addEventListener('click', addNotes);

showNotes();
