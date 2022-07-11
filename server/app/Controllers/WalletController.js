const fetch = require('node-fetch');
const EC = require('elliptic').ec;

const asyncHandler = require('express-async-handler')
var ObjectId = require('mongodb').ObjectId;
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

function getCitizenByNid(nid){
    //
}

const getVoterByNid = async (nid) => {
    const voter = await Voter.findOne({"nid":nid});
    if(voter){
        return true;
    }else{
        return false;
    }
}

// const genVoterWallet = asyncHandler(
//     async (req, res) => {
//         const { nid } = req.body
        
//         const url = 'http://localhost:8080/citizen'
//         const response = await fetch(url);
//         const data = await response.json();
//         let obj = [];

//         // if(!data){
//         //     res.status(401)
//         //     throw new Error('Server Error. Please try again later')
//         // }
//         if (response.status == 200){
//             for (let i = 0; i < data.length; i++){
//                 console.log(data[i].nid)
//                 console.log(nid)
//                 //check if NID exists in govt database
//                 if(data[i].nid == nid){
//                     //check if the nid is already exists in registered voter list
//                     if(getVoterByNid(nid)){
//                         const message = {
//                             'messege' : 'You are already registered as a Voter'
//                         }
//                         obj.push(message)
//                     }else{
//                         //call the function to store data in mongodb
//                         const voterInfo = generateWallet(nid);
//                         const success = storeVoterInfoInDB(voterInfo.Public_key, voterInfo.nid);
//                         if (success){
//                             obj.push(voterInfo)
//                         }
//                     }
//                 }else{
//                     console.log('your nid is not valid : '+ data[i].nid)
//                 }
//             }
//             res.status(200).json(obj)
//         }
//     }
// )

const genVoterWallet = asyncHandler(
    async (req, res) => {
        const { nid } = req.body
        
        const url = 'http://localhost:8080/citizen'
        const response = await fetch(url);
        const data = await response.json();
        let obj = [];

        // if(!data){
        //     res.status(401)
        //     throw new Error('Server Error. Please try again later')
        // }
        if (response.status == 200){
            for (let i = 0; i < data.length; i++){
                //check if NID exists in govt database
                if(data[i].nid == nid){
                 
                }else{
                    console.log('your nid is not valid : '+ data[i].nid)
                }
            }
            res.status(200).json(obj)
        }
    }
)


module.exports = {
    genVoterWallet
}
