const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../database/models/User')
module.exports = {
    login: async (req, res) => {
        // Body destructuring
        const { username , password } = req.body;

        // Get user from database
        const user = await User.findOne({ username })
        // Verify user and pw
        const okPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)

        // Return if invalid user/password
        if(!(user && okPassword)){
            return res.status(401).json({error: 'invalid user or password'})
        }

        // Declare data for token creation
        const userForToken = {
            id: user._id,
            username: user.username
        }

        // Create token
        const token = jwt.sign(
            userForToken,
            process.env.SECRET,
            {
                expiresIn: 60 * 60 * 24 * 30    // 1 month expiration
            }
        )

        return res.json({
            name: user.name,
            username: user.username,
            token
        })
    }
}