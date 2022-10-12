const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // Get authorization from header
    const authorization = req.get('authorization')
    let token = ''

    // Get token (format is always "bearer <token>" 
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
       /*  Otra forma:
        token = authorization.split(' ')[1] */
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    // Check if token is correct ('id' was sent in token creation)
    if(!token || !decodedToken.id){
        return res.status(401).json({error:'token missing or invalid'})
    }

    // Get id from token
    const { id: userId } = decodedToken

    // Define userId in request to serve as input for the following process
    req.userId = userId

    next()
}