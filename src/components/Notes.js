
import { React, useContext } from 'react'
import NotesContext from '../context/notesContext';
import Note from './Note';


const Notes = () => {
    const { UserNotes } = useContext(NotesContext);
    // console.log(Notes)
    return (
        <div className='row my-3'>
            {UserNotes.map((note) => {
                return <Note note={note} key={note._id} />
            })}
        </div>
    )
}

export default Notes
