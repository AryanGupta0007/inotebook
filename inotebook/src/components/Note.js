import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext.js'

export const Note = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context
    const note = props.note
    return (
        <div className={"col-md-3 mx-3 my-2"}>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.desc}</p>
                    <i onClick={ () => {
                        deleteNote(note._id)
                    }} className="fa-solid fa-trash mx-5" ></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
            </div>
        </div>
    )
}