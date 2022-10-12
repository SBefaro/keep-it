const express = require('express');
const notesRouter = express.Router();
const notesController = require('../controllers/notesController')
const userExtractor = require('../middlewares/userExtractor')

// Get all Notes
notesRouter.get('/', notesController.list)
//Get one note
notesRouter.get('/:id', notesController.detail)
// Create a Note
notesRouter.post('/', userExtractor, notesController.create)
// Modify one note
notesRouter.put('/:id', notesController.edit)
// Delete one note
notesRouter.delete('/:id', userExtractor, notesController.destroy)


module.exports = notesRouter