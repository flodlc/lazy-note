import { FunctionComponent } from 'react';
import React from 'react';
import Editor from '../Editor/Editor';
import { INote } from '../../models/Note';

const NoteForm: FunctionComponent<{
    note: Partial<INote>;
    onChange: (note: INote) => void;
}> = ({ note, onChange = () => {} }) => {
    const handleContentChange = (content: any[]) => {
        onChange({
            ...note,
            content,
            title: content[0].children[0].text,
        });
    };

    return <Editor value={note.content} onChange={handleContentChange} />;
};

export default NoteForm;
