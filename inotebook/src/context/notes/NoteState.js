import React, {useState} from 'react'
import NoteContext from './NoteContext.js'
const host = "http://localhost:3005/api/notes/"
const NoteState = (props) => {
    const [notes, setNotes] = useState([
        {
            "_id": "670981a6d37e98653628df8f1",
            "user": "67096f30285d98b666ff3634",
            "title": "My note",
            "tag": "Software Dev",
            "desc": "My first note and its the best",
            "date": "1728676262896",
            "__v": 0
        },
        {
            "_id": "670b8d550bcb9f021bebe2ca",
            "user": "67096f30285d98b666ff3634",
            "title": "My note2",
            "tag": "Software Dev",
            "desc": "My first note and its the best",
            "date": "1728810325805",
            "__v": 0
        },
        {
            "_id": "670b8d5f0bcb9f021bebe2cc",
            "user": "67096f30285d98b666ff3634",
            "title": "My note2",
            "tag": "Software Dev",
            "desc": "My first note and its the best",
            "date": "1728810335070",
            "__v": 0
        },
        {
            "_id": "670b8d550bcb9f021bebe2ca2",
            "user": "67096f30285d98b666ff3634",
            "title": "My note2",
            "tag": "Software Dev",
            "desc": "My first note and its the best",
            "date": "1728810325805",
            "__v": 0
        },
    ])
    const addNote = (note) => {
        const newNote =
            {
                "_id": "670b8d5f0bcb9f021bebe2cc2",
                "user": "67096f30285d98b666ff3634",
                "title": note.title,
                "tag": note.tag,
                "desc": note.desc,
                "date": "1728810335070",
                "__v": 0
            }
        setNotes(notes.concat(newNote))
    }
    const editNote = async (id, title, desc, tag) => {
        const url = host + "updatenote/6709835e9800bc1fd725a427/"
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response.json()
        for (let index=0; index<notes.length; index++){
            const element = notes[index]
            if (element._id === id){
                title = element.title
                desc = element.desc
                tag = element.tag
            }
        }
    }
    const deleteNote = (id) => {
        console.log('Deleting note with id', id)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState