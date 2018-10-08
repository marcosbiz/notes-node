const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argvOpsTitle = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const argvOpsBody = {
    describe: 'Body of node',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: argvOpsTitle,
        body: argvOpsBody
    })
    .command('list', 'List all notes')
    .command('read','Read a note', {
        title: argvOpsTitle
    })
    .command('remove', 'Remove a note', {
        title: argvOpsTitle
    })
    .help()
    .argv;
let command = argv._[0];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note title taken.');
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found.');
        notes.logNote(note);
    } else {
        console.log('Note not found.');
    }
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed.' : 'Note not found.';
    console.log(message);
} else {
    console.log('Command not recognized');
}