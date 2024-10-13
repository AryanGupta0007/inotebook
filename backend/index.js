import {connectToMongo} from './db.js'
import express from 'express'
import {router as authRouter} from './routes/auth.js'
import {router as notesRouter} from './routes/notes.js'
const app = express()
const port = 3005

connectToMongo()
app.use(express.json()) // middleware to deal with body
app.use('/api/auth', authRouter)
app.use('/api/notes', notesRouter)
app.get('/', (req, res)=>{
    res.send("Hello World!")
})
app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})