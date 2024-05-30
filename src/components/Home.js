
import React, { useEffect, useContext } from 'react'
import NotesContext from '../context/notesContext'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { GetNotes } = useContext(NotesContext);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            console.log("User Login")
            GetNotes();
        } else {
            navigate('/userLogin')
        }
        // eslint-disable-next-line
    }, [])
    const onSubmit = () => {
        // AddNote();
    }

    return (
        <>
            <div className='container my-3'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Note Title</label>
                        <input type="text" className="form-control" id="noteTitle" name="title" aria-describedby="emailHelp" placeholder="Enter Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Note Content</label>
                        <input type="text" className="form-control" id="noteContent" placeholder="Type Content" />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">Add Note</button>
                </form>
                <div className="container">
                    <Notes />
                </div>
            </div>

        </>
    );
}

export default Home
