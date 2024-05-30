
import React from 'react'

const Note = (props) => {
    const { note } = props
    return (
        <div className="card mx-2 my-2" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <i className="fa-regular fa-pen-to-square mx-2" ></i>
                <i className="fa-solid fa-trash mx-2"></i>
            </div>
        </div>
    )
}

export default Note
