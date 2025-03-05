
import React, { useContext } from 'react'
import NoteContext from '../context/notesContext'
import { FaRegTrashAlt } from "react-icons/fa";

const Note = (props) => {
    const { note } = props
    const { DeleteNote, GetNotes } = useContext(NoteContext)
    const noteDelete = (id) => {
        DeleteNote(id);
        GetNotes();
    }

    return (
        <div className="card mx-2 my-2" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <i className="fa-regular fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={() => noteDelete(note._id)}><FaRegTrashAlt /></i>
            </div>
        </div>
    )
}

export default Note
