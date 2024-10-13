import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/NoteContext";


export const AddNote = () => {
    const noteContext = useContext(NoteContext)
    const {addNote} = noteContext
    const [note, setNote] = useState({title: "", desc: "", tag: ""})
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note)
    }
    const onChange = (e) => {
        console.log(e, e.target, e.target.value)
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <h1>Add a Note</h1>
            <form className={"my-3"}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input name={"title"} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                    <input name={"tag"} className="form-control" id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textArea name={"desc"} className="form-control" id="exampleInputPassword1" rows={"8"} onChange={onChange}></textArea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </>
    )
}