const express = require('express')
const router = express.Router()
const User = require('../model/user')
const {jwtAuthMiddleware, generateToken} = require('../jwt')

router.post('/signup', async (req, res)=> {

    try {
        const data = req.body // Assuming the request body contains the person data

        //Create a new Person document using the Mongoose Model
        const newUser = new User(data)

        //Save the new person to the database
        const response = await newUser.save()
        console.log('Person Data saved');

        const payload = {
            id: response.id
        }
        // console.log('payload is : ',payload)
        const token = generateToken(payload)
        // console.log('Token is: ',token)
        res.status(200).json({response: response, token: token});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


//Login route

router.post('/login', async(req, res) => {
    try {
        //Extract username and password from request body
        const {adharCardNumber, password} = req.body;

        //Find the user by username
        const user = await User.findOne({adharCardNumber: adharCardNumber})

        //if user dose not exist or password dose not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate token
        const payload = {
            id: user.id
        }
        const token = generateToken(payload)

        //return token as response
        res.json({token})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

//Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.res.user;
        // console.log('User Data: ', userData);
        const userId = userData.id;
        const user = await User.findById(userId)
        res.status(200).json({user});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

router.put('/profile/password', async(req, res) => {
    try {
        const userId = req.res.user; // Extarct the id from token
        const {currentPassword, newPassword} = req.body // Extract current and new password from the request body

        // Find the user by userId 
        const user = await User.findById(userId)

        //if password dose not match, return error
        if(!user || !(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: 'Invalid password'});
        }


        //Update the password
        user.password = newPassword;
        await user.save();

        console.log("Password Updated")
        res.status(200).json({message: "Password Updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})



module.exports = router