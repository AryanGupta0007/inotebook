import mongoose from 'mongoose'
const {Schema} = mongoose

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: "string",
        required: true
    },
    tag:{
        type: "string",
        default: "General"
    },
    desc:{
        type: "string",
        required: true
    },
    date:{
        type: "string",
        default: Date.now
    },
})

export default mongoose.model('Note',  NoteSchema, 'notes');