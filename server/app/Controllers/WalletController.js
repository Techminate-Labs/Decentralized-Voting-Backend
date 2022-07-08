const fetch = require('node-fetch');
const EC = require('elliptic').ec;

const asyncHandler = require('express-async-handler')

//Models
const Voter = require('../Models/Voter')

const ec = new EC('secp256k1');

function generateWallet(nid) {
        //Key pair should be generated based on NID 
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');

        const voterInfo = {
            'Public_key' : publicKey,
            'Private_key' : privateKey,
            'nid' : nid,
            'vote': 1
        }

        return voterInfo;
    }

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

function searchVoterInfoInDB(nid){
    return Voter.findById(nid);
}

const genVoterWallet = asyncHandler(
    async (req, res) => {
        const { nid } = req.body
        const url = 'http://localhost:8080/citizen'
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status == 200){
            data.map((citizen)=>{
                //check if NID exists in govt database
                if(citizen.nid === nid){
                    //check if the nid is already registered as a voter
                    const voter = Voter.findById(nid);
                    if(voter){
                        res.status(200).json(voter)
                    }else{
                        //call the function to store data in mongodb
                        const voterInfo = generateWallet(nid);
                        const success = storeVoterInfoInDB(voterInfo.Public_key, voterInfo.nid);
                        if (success){
                            res.status(200).json(voterInfo)
                        }
                    }
                }
            })
        }else{
            const error = 'Please insert a valid NID'
            res.status(200).json(error)
        }
    }
)

module.exports = {
    genVoterWallet
}
