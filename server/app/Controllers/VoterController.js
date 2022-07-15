const fetch = require('node-fetch');

const asyncHandler = require('express-async-handler')
var ObjectId = require('mongodb').ObjectId;

//Models
const Voter = require('../Models/Voter')
const Citizen = require('../models/Citizen')

const validateNid = asyncHandler(
    async (req, res) => {
        const { nid } = req.body;
        const citizen = await Citizen.findOne({"nid":nid});
        const voter = await Voter.findOne({"nid":nid});
        //check if nid is available in govt database
        if(citizen == null){
            let obj1 = {
                'message' : 'invalid nid'
            }
            res.status(200).json(obj1)
        }else if(voter !== null){
            //check if already registered as a voter
            let obj2 = {
                'message' : 'you are already registered as a voter',
                'nid':voter.nid,
                'public_key' : voter.pubKey
            }
            res.status(200).json(obj2)
        }else{
            let obj3 = {
                'message' : '404'
            }
            res.status(200).json(obj3)
        }
        
    }
)

const voterRegistration = asyncHandler(
    async (req, res) => {
        const { nid, publicKey  } = req.body;
        const voter = await Voter.findOne({"nid":nid});

        if(voter){
            res.status(200).json({'message' : 'you are already registered as a voter'});
        }else{
            //store the voterInfoForDatabase object in mongodb/blockchain
            const success = Voter.create({
                nid: nid,
                pubKey: publicKey,
                vote: 1
            })
    
            if(success){
                let obj = {
                    'message' : 'Voter registration completed',
                    'nid':nid,
                    'public_key' : publicKey,
                    'vote': 1
                }
                res.status(200).json(obj);
            }else{
                res.status(200).json({'message' : 'Try again'});
            }
        }
    }
)

const voterGetByPubKey = asyncHandler(
    async (req, res) => {
        const voter = await Voter.findOne({"pubKey":req.params.pk});

        if(!voter){
            let obj1 = {
                'message' : 'Voter with the public key was not found in the record',
                'query_status' : '404'
            }
            res.status(200).json(obj1);
        }else{
            let obj2 = {
                'message' : 'Voter info found',
                'query_status' : '200',
                'nid': voter.nid,
                'public_key' : voter.pubKey,
                'vote': voter.vote
            }
            res.status(200).json(obj2);
        }
    }
)

const voterGetByNid = asyncHandler(
    async (req, res) => {
        const voter = await Voter.findOne({"nid":req.params.nid});

        if(!voter){
            let obj1 = {
                'message' : 'Voter with the NID was not found in the record',
                'query_status' : '404'
            }
            res.status(200).json(obj1);
        }else{
            let obj2 = {
                'message' : 'Voter info found',
                'query_status' : '200',
                'nid': voter.nid,
                'public_key' : voter.pubKey,
                'vote': voter.vote
            }
            res.status(200).json(obj2);
        }
    }
)

module.exports = {
    validateNid,
    voterRegistration,
    voterGetByPubKey,
    voterGetByNid
}
