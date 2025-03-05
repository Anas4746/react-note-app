
import NoteContext from './notesContext';

import React, { useState } from 'react'

const NoteState = (props) => {
    const host = "http://localhost:2600/notes"
    const [UserNotes, setNotes] = useState([]);

    const GetNotes = async () => {
        const response = await fetch(`${host}/getnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const data = await response.json();
        if (data.success.success === true) {
            console.log(data.notes)
            setNotes(data.notes)
            // console.log(UserNotes)
        } else {
            alert('User Not Found');
        }
    }

    const AddNote = async (title, content) => {
        const response = await fetch(`${host}/usercreateNote`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({
                title, content
            })
        });
        const data = await response.json();
        setNotes(data.userNotes);
        // if (data.success.success === true) {
        //     console.log(data.userNotes)
        //     setNotes(data.userNotes)
        //     // console.log(UserNotes)
        // } else {
        //     alert('User Not Found');
        // }
    }

    const DeleteNote = async (id) => {
        const response = await fetch(`${host}/notedelete/${id}`, {
            method: "Delete"
        })
        const data = await response.json();
        if (data.success.success === true) {
            console.log(data.notes)
            setNotes(data.notes)
            // console.log(UserNotes)
        } else {
            alert('User Not Found');
        }
    }

    return (
        <div>
            <NoteContext.Provider value={{ UserNotes, GetNotes, AddNote, DeleteNote }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}

export default NoteState
