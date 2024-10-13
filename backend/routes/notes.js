import express from 'express'
import Note from '../models/Notes.js'
import {body, validationResult} from 'express-validator'
import fetchUser from '../middleware/fetchUser.js'

export const router = express.Router()
router.get("/fetch/", fetchUser, async (req, res) => {
    const userId = req.user.id
    const notes = await Note.find({user: req.user.id})
    return res.json({notes})
})

router.post('/create/', [
    body('title', 'Title should be atleast 3 characters').isLength({min: 3}),
    body('desc', 'Description should be atleast 20 characters').isLength({min: 20})
], fetchUser, async (req, res) => {
    const error = validationResult(req)
    console.log(req.user.id)
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()})
    }
    try {
        const note = await Note.create(
            {
                user: req.user.id,
                title: req.body.title,
                desc: req.body.desc,
                tag: req.body.tag,
            }
        )
        return res.status(200).json({msg: 'Note created', note})
    } catch (error) {
        console.log('Error ', error)
        return res.status(500).json({msg: "internal server error"})
    }
})

// update the existing note
router.put('/updatenote/:id/', fetchUser, async (req, res) => {
    console.log(req.params.id)
    let note = await Note.findById(req.params.id)
    console.log(note)
    // console.log(note)
    if (!note) {
        return res.status(404).json({msg: "Not Found"})
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).json({msg: "Not Authorized"})
    }

    const {title, desc, tag} = req.body
    let newNote = {}
    if (title) {
        newNote.title = title
    }
    if (desc) {
        newNote.desc = desc
    }
    if (tag) {
        newNote.tag = tag
    }
    console.log(newNote)
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.status(200).json({note, msg: "Note updated successfully"})
})
router.delete('/deletenote/:id/', fetchUser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(409).json({msg: 'Note not found'})
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not Authorized'})
        }
        await Note.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: 'note deleted'})
    } catch (error) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }

})
