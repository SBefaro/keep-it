const User = require('../database/models/User')
const Note = require('../database/models/Note')
module.exports = {
    list: (req, res) => {
        Note.find({}).populate('user',{
            username: 1,
            name: 1,
            _id: 0
        }).sort({date:-1})
        .then(notes => res.json(notes))
    },
    detail: (req, res, next) =>{
        const { id: noteId }= req.params

        Note.findById(noteId)
        .then(note => {
            if(note){
                return res.json(note)
            }
            return res.status(404).end()
        })
        .catch(err => next(err))
    },
    create: async (req, res, next) => {
        const { title, content, important = false } = req.body
        /* Otra forma: 
        content = req.body.content;
        important = req.body.important || false */

        const { userId } = req  // Esta info la envía el middleware userExtractor
        const user = await User.findById(userId)

        const newNote = new Note({
            title,
            content: content || "",
            date: new Date(),
            important,
            user: user._id
        })

        try{
            const createdNote = await newNote.save()

            // Concat note id to User model
            user.notes = user.notes.concat(createdNote._id)
            await user.save()

            return res.json(createdNote)
        }
        catch(err){
            next(err)
        }
    },  
    edit: (req, res, next) => {
        const { id : noteId } = req.params
        const { title, content, important= false } = req.body


        const newNoteInfo = {
            title,
            content,
            date: new Date(),
            important

        }

        // { new:true } returns new content as response instead of the old note
        Note.findByIdAndUpdate(noteId, newNoteInfo, { new:true })
        .then(note => res.json(note))
        .catch(err => next(err))
    },
    destroy: (req, res, next) => {
        const { id : noteId } = req.params

        Note.findByIdAndDelete(noteId)
        .then(result => {
            if(result === null){
                return res.sendStatus(404)
            }
            return res.status(204).end()
        })
        .catch(err => next(err))
    }
}