const express = require('express');
const router = express.Router();
const User = require('../Models/User.js')
const Team = require('../Models/Team.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser.js')

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

//ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require login
router.post('/createTeam', fetchUser, [
    body('college', 'Enter a Valid College Name').isLength({ min: 3 }),
    body('teamName', 'Enter a Valid Team Name').isLength({ min: 3 }),
    body('description', 'Description should be atleast 10 characters long').isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, error: errors.array()[0].msg });
    }
    try {
        let success = false;
        let user = await User.findOne({ _id: req.user.id });
        if (user.teamId !== null) {
                return res.status(400).json({success, error: 'User is already a part of some team' });
        }
        
        //Create a new User
        let team = await Team.create({
            name: req.body.teamName,
            teamLeader: req.user.id,
            description: req.body.description,
            memberCount: 1,
            members: [
                {
                    Id: req.user.id,
                    name: user.name,
                }
            ]
        })
        await User.findOneAndUpdate({_id: req.user.id},{teamId: team._id, teamName: team.name})
        success=true;
        res.status(200).json({success,team});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//ROUTE 2: Authenticate a User with login credentials using: POST "/api/auth/login". Doesn't require login
router.post('/joinTeam', fetchUser,[
    body('college', 'Enter a Valid College Name').isLength({ min: 3 }),
], async (req, res) => {
    console.log(req.body);
    let success = false;
    //If an Error is Found, return bad Request
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({success, error: errors.array()[0].msg });
    }
    try{
        let success = false;
        let user = await User.findOne({ _id: req.user.id });
        if (user.teamId !== null) {
                return res.status(400).json({success, error: 'User is already a part of some team' });
            }
            
            
        let team = await Team.findOne({_id: req.body.teamId});
        if(team.memberCount >= 3){
            return res.status(400).json({success, error: 'The Team is Already Full' });
        }

        let newMembers = team.members;
        newMembers.push({Id:req.user.id, name: user.name});
        let newMemberCount = team.memberCount;
        newMemberCount++;

        await Team.findOneAndUpdate({_id: team._id},{members: newMembers, memberCount: newMemberCount});
        await User.findOneAndUpdate({_id: req.user.id}, {teamId: team._id, teamName: team.name});
        success = true;
        console.log('user login successsful')
        res.status(200).json({success, team});
          
    } catch(error){
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})


router.get('/getTeams', async (req, res) => {
    try{
        let teams = await Team.find({});
        return res.status(200).json({success: true, teams});
          
    } catch(error){
        console.log(error.message);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
})



module.exports = router;