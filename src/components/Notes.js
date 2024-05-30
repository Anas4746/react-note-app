
import { React, useContext } from 'react'
import NotesContext from '../context/notesContext';
import Note from './Note';


const Notes = () => {
    const { Notes } = useContext(NotesContext);
    // console.log(Notes)
    return (
        <div className='row my-3'>
            {Notes.map((note) => {
                return <Note note={note} />
            })}
        </div>
    )
}

export default Notes
