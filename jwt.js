const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {

    //first check request headers has authorization or not
    const authorization = req.headers.authorization
    // console.log(authorization)
    if(!authorization) return res.status(401).json({ error : 'Token not found'})

    //Extract the jwt token fro the request header
    const token = req.headers.authorization.split(' ')[1];
    // console.log('token is here :', token)
    if(!token) return res.status(401).json({error: 'Unauthorised'});

    try {
        // verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object
        res.user = decoded
        next();
    } catch (error) {
        console.error(error)
        res.status(401).json({error: 'Invalid token'})
    }
}


//Function to generate jwt token
const generateToken = (userData) => {
    //Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn : 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};