const express = require('express')
const router = express.Router()
const Candidate= require('../model/candidate')
const User = require('../model/user')
const {jwtAuthMiddleware, generateToken} = require('../jwt')


const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId)
        // console.log('user role : ',user.role)
        if(user.role === 'admin'){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
}


//Post route to add a candidate
router.post('/',jwtAuthMiddleware, async (req, res)=> {
    try {
        if(! await checkAdminRole(req.res.user.id)){
            return res.status(404).json({message: "user dose not have admin role"})
        }
        const data = req.body // Assuming the request body contains the person data

        //Create a new candidate document using the Mongoose Model
        const newCandidate = new Candidate(data)

        //Save the new person to the database
        const response = await newCandidate.save()
        console.log('Candidate Data saved');
        res.status(200).json({response: response});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})




router.put('/:candidateId',jwtAuthMiddleware , async(req, res) => {
    try {
        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({message: "user dose not have admin role"})
        }


        const candidateId = req.params.candidateId; // Extarct the id from the URL parameter 
        const updatedCandidateData = req.body; // Updated Data for the person

        const response = await Person.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true, // Return the updated document
            runValidators: true, // Run mongoose validation
        })

        if(!response){
            res.status(404).json({error: "Candidate not found"})
        }

        console.log("Candidate Data Updated")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})


router.delete('/:candidateId',jwtAuthMiddleware , async(req, res) => {
    try {
        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({message: "user dose not have admin role"})
        }


        const candidateId = req.params.candidateId; // Extarct the id from the URL parameter 
        // const updatedCandidateData = req.body; // Updated Data for the person

        const response = await Person.findByIdAndDelete(candidateId)

        if(!response){
            res.status(404).json({error: "Candidate not found"})
        }

        console.log("Candidate Deleted")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})


// Let's start voting
router.post('/vote/:candidateID', jwtAuthMiddleware, async(req, res) => {
    //no admin can vote
    //user can only vote once

    candidateID = req.params.candidateID;
    userId = req.res.user.id;

    try{
        // Find the candidate document with specified candidateID
        const candidate = await Candidate.findById(candidateID)
        if(!candidate){
            return res.status(404).json({ message: 'Candidate not found'});
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ message: 'User not found'});3
        }
        if(user.isVoted){
            return res.status(400).json({ message: 'You have already voted'})
        }
        if(user.role === 'admin'){
            return res.status(403).json({ message: 'admin is not allowed to vote'})
        }


        //Update the Candidate document to record the vote
        candidate.votes.push({user: userId})
        candidate.voteCount++;
        await candidate.save();

        //update the user document
        user.isVoted = true;
        await user.save();

        return res.status(200).json({message: 'Vote recorded successfully'});
    }catch(error){
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})


//vote count
router.get('/vote/count', async (req, res) => {
    try {
        // Find all candidate and sort them by voteCount in descending order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        //Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            }
        })

        return res.status(200).json(voteRecord)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router