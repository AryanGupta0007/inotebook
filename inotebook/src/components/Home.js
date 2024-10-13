import React from 'react'
import {Notes} from './Notes.js'
import {AddNote} from './AddNote.js'
export const Home = () => {
    return (
        <div className={"container my-3"}>
            <AddNote />
            <Notes />
        </div>
    )
}
