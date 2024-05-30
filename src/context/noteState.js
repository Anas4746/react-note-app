
import NoteContext from './notesContext';

import React, { useState } from 'react'

const NoteState = (props) => {
    const host = "http://localhost:2600/notes"
    const [UserNotes, setNotes] = useState([]);
    const Notes = [
        {
            "title": "This is my first title",
            "content": "Hey my name is first content"
        },
        {
            "title": "This is my first title",
            "content": "Hey my name is first content"
        },
        {
            "title": "This is my second title",
            "content": "Hey my name is second content"
        },
        {
            "title": "This is my third title",
            "content": "Hey my name is third content"
        },
        {
            "title": "This is my fourth title",
            "content": "Hey my name is fourth content"
        }
    ]

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
            console.log(UserNotes)
        } else {
            alert('User Not Found');
        }
    }

    return (
        <div>
            <NoteContext.Provider value={{ Notes, GetNotes }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}

export default NoteState
