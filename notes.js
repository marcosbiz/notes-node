console.log('Starting notes.js');

const NOTESDATA = 'notes-data.json';

const fs = require('fs');

const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync(NOTESDATA);
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync(NOTESDATA, JSON.stringify(notes));
};

const addNote = (title, body) => {
    let notes = fetchNotes();
    var note = {
        title,
        body
    };

    let duplicateNotes = notes.filter((note) => note.title === title);
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => {
    console.log('Getting all notes');
};

const getNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

const removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

const logNote = (note) => {
    console.log('Note found.');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};