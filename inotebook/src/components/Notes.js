import React, {useContext} from 'react'
import {Note} from './Note.js'
import NoteContext from "../context/notes/NoteContext";
export const Notes = () => {
    const context = useContext(NoteContext) // accessing the value passed in the context
    const {notes, addNote} = context
    return (
        <div>
            <h2>Your notes</h2>
            <div className={"row"}>
                {notes.map((note) => {
                    return <Note  note={note}/>
                })}
            </div>

        </div>
    )
}