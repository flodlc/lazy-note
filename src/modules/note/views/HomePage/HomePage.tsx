import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Container } from '../../../core/ui/Container';
import styled from '@emotion/styled';
import Note from '../../components/Note/Note';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { INote } from '../../models/Note';
import notesService from '../../services/notes.service';
import { replaceItemInArray } from '../../../core/utils/utils';
import Logo from '../../../core/ui/Logo/Logo';
import Header from '../../components/Header/Header';
import NoteForm from '../../components/NoteForm/NoteForm';
import PasswordContext from '../../contexts/PasswordContext';

const useNoteFromStorage = (
    id: string,
    notes?: INote[]
): [Partial<INote> | undefined, typeof setNote] => {
    const [note, setNote] = useState<Partial<INote> | undefined>();
    const history = useHistory();
    const { password } = useContext(PasswordContext);

    if (!password) {
        history.push('/');
        throw new Error('Missing password');
    }
    useEffect(() => {
        let note;
        if (id) {
            note = notesService.findNote(id, password);
            setNote(note);
        }
        if (!note) {
            setNote({});
            history.push('/notes');
        }
    }, [id, notes, history, password]);
    return [note, setNote];
};

const HomePage: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { password } = useContext(PasswordContext) as { password: string };

    const [notes, setNotes] = useState(notesService.findAllNotes(password));
    const [note, setNote] = useNoteFromStorage(id, notes);

    const handleNote = (newNote: INote) => {
        if (newNote.id) {
            const updatedNote = notesService.updateNote(newNote, password);
            const updatedNotes = replaceItemInArray(
                notes,
                updatedNote,
                (item) => item.id === newNote.id
            );
            setNotes(updatedNotes);
            setNote(updatedNote);
        } else if (newNote.title) {
            const createdNote = notesService.createNote(newNote, password);
            setNotes([createdNote, ...notes]);
            setNote(createdNote);
            history.push(`/notes/${createdNote.id}`);
        }
    };

    const deleteNote = (noteId?: string) => {
        if (!noteId) return;
        notesService.deleteNote(noteId, password);
        setNotes(
            replaceItemInArray(notes, undefined, (item) => item.id === noteId)
        );
    };

    const createNote = () => {
        setNote({});
        history.push('/notes');
    };

    return (
        <Wrapper flex-1>
            <Header
                title="Mes notes"
                count={notes.length}
                action={{ label: 'Nouvelle note', onClick: createNote }}
            />
            <BodyWrapper>
                <NotesWrapper>
                    <ScrollWrapper>
                        {notes && notes.length ? (
                            notes.map((noteItem) => (
                                <NoteWrapper
                                    to={`/notes/${noteItem.id}`}
                                    selected={!!note && noteItem.id === note.id}
                                    key={noteItem.id}
                                >
                                    <Note
                                        title={noteItem.title}
                                        date={noteItem.date}
                                        onDelete={() => deleteNote(noteItem.id)}
                                    />
                                </NoteWrapper>
                            ))
                        ) : (
                            <Logo height={40} />
                        )}
                    </ScrollWrapper>
                </NotesWrapper>
                {note && (
                    <EditorWrapper>
                        <NoteForm note={note} onChange={handleNote} />
                    </EditorWrapper>
                )}
            </BodyWrapper>
        </Wrapper>
    );
};

export default HomePage;

const NoteWrapper = styled(Link)<{ selected?: boolean }>`
    display: block;
    margin-bottom: 20px;
    transition: outline-color 300ms;
    outline: ${({ selected }) =>
        selected ? '2px solid #34c3fe' : 'transparent'};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const NotesWrapper = styled.div`
    border-right: 1px solid #e2e2e2;
    margin-right: 20px;
    padding-right: 4px;
    flex: 1;
    max-width: 420px;
    display: flex;
    flex-direction: column;
`;

const ScrollWrapper = styled.div`
    flex: 1 1 0;
    min-width: 0;
    overflow: auto;
    margin: 0 -8px 0;
    padding: 10px 25px 10px 10px;
`;

const BodyWrapper = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`;

const EditorWrapper = styled.div`
    flex: 1;
    height: 100%;
    margin: auto;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 12px 0 #e4e4e4;
    background: white;
`;
