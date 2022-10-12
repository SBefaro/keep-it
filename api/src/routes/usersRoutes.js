const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController')

// Get all users
usersRouter.get('/', usersController.list)
// Create one user
usersRouter.post('/', usersController.create)
// Get one user
usersRouter.get('/:username', usersController.detail)

module.exports = usersRouter