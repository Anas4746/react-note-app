
import React, { useEffect, useContext, useState } from 'react'
import NotesContext from '../context/notesContext'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { GetNotes, AddNote } = useContext(NotesContext);
    const [notedata, setNoteData] = useState({ title: "", content: "" })
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
    const onSubmit = (e) => {
        e.preventDefault();
        AddNote(notedata.title, notedata.content);
        setNoteData({ title: "", content: "" });
        GetNotes();
    }
    const onChange = (e) => {
        setNoteData({ ...notedata, [e.target.name]: e.target.value });

    }
    return (
        <>
            <div className='container my-3'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Note Title</label>
                        <input type="text" className="form-control" id="noteTitle" name="title" aria-describedby="emailHelp" placeholder="Enter Title" value={notedata.title} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Note Content</label>
                        <input type="text" className="form-control" id="noteContent" name="content" placeholder="Type Content" value={notedata.content} onChange={onChange} />
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
