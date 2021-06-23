import { IEncryptedNote, INote } from '../models/Note';
import cryptoService from './crypto.service';

const randomstring = require('randomstring');

const persistNotes = (notes: INote[], password: string) => {
    const encryptedNotes = notes.map((note) => encryptNote(note, password));
    localStorage.setItem('notes', JSON.stringify(encryptedNotes));
};

const findAllNotes = (password: string) => {
    const encryptedNotes = JSON.parse(
        localStorage.getItem('notes') || '[]'
    ) as IEncryptedNote[];
    return encryptedNotes.map((encryptedNote) => {
        return decryptNote(encryptedNote, password);
    });
};

const findNote = (id: string, password: string) => {
    const notes = findAllNotes(password);
    return notes.find((node) => node.id === id);
};

const createNote = (note: INote, password: string) => {
    const id = randomstring.generate(10);
    const notes = findAllNotes(password);
    const createdNote = { ...note, id, date: new Date().toISOString() };
    notes.unshift(createdNote);
    persistNotes(notes, password);
    return createdNote;
};

const updateNote = (note: INote, password: string) => {
    const notes = findAllNotes(password);
    const index = notes.findIndex((item) => item.id === note.id);
    notes.splice(index, 1, note);
    persistNotes(notes, password);
    return note;
};

const deleteNote = (noteId: string, password: string) => {
    if (!noteId) {
        throw new Error();
    }
    const notes = findAllNotes(password);
    const index = notes.findIndex((item) => item.id === noteId);
    notes.splice(index, 1);
    persistNotes(notes, password);
};

const decryptNote = (
    encryptedNote: IEncryptedNote,
    password: string
): INote => {
    return {
        ...encryptedNote,
        content: cryptoService.decryptJSON(
            encryptedNote.encryptedContent,
            password
        ),
        title: encryptedNote.encryptedTitle
            ? cryptoService.decryptString(
                  encryptedNote.encryptedTitle,
                  password
              )
            : encryptedNote.encryptedTitle,
    };
};

const encryptNote = (note: INote, password: string): IEncryptedNote => {
    return {
        id: note.id,
        encryptedContent: cryptoService.encryptJSON(note.content, password),
        encryptedTitle: cryptoService.encryptString(note.title || '', password),
        date: note.date,
    };
};

const notesService = {
    findAllNotes,
    findNote,
    createNote,
    updateNote,
    deleteNote,
};

export default notesService;
