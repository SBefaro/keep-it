const bcrypt = require('bcrypt')
const User = require('../database/models/User')
module.exports = {
    list: (req, res) => {
        User.find({}).populate('notes',{
            content: 1,
            date: 1,
        })
        .then(users => res.status(200).json(users))
        .catch(err => console.error(err))
    },

    create: async (req, res) => {
        const { name , username , password } = req.body;
        const saltOrRounds = 10
        const passwordHash = await bcrypt.hash(password, saltOrRounds)

        const user = new User ({
            name,
            username,
            passwordHash
        })

        const createdUser = await user.save()

        return res.status(201).json(createdUser)
    },
    detail: (req, res) =>{
        User.findOne({username: req.params.username}).populate('notes',{
            title: 1,
            content: 1,
            date: 1,
            important: 1,
        })
        .then(user => res.status(200).json(user))
        .catch(err => console.error(err))
    }
}