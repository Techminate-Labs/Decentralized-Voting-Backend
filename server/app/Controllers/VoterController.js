const fetch = require('node-fetch');

const asyncHandler = require('express-async-handler')
var ObjectId = require('mongodb').ObjectId;

//Models
const Voter = require('../Models/Voter')
const Citizen = require('../models/Citizen')

function storeVoterInfoInDB(pubKey, nid){
    //store the voterInfoForDatabase object in mongodb/blockchain\
    const voter = Voter.create({
        nid: nid,
        pubKey: pubKey,
        vote: 1
    })

    if(voter){
        return true;
    }else{
        return false;
    }

}

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
        const { nid, publicKey  } = req.body
    }
)

module.exports = {
    validateNid,
    voterRegistration
}
