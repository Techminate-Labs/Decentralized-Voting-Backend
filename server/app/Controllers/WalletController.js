const fetch = require('node-fetch');

const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const asyncHandler = require('express-async-handler')

function generateWallet(nid) {
        //Key pair should be generated based on NID 
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');

        const voterInfo = {
            'Public key' : publicKey,
            'Private key' : privateKey,
            'nid' : nid,
            'vote': 1
        }

        const voterInfoForBlockchain = {
            'Public key' : publicKey,
            'nid' : nid,
            'vote': 1
        }

        return voterInfo;
    }

const genVoterWallet = asyncHandler(
    async (req, res) => {
        const { nid } = req.body
        
        const url = 'http://localhost:8080/citizen'
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status == 200){
            data.map((citizen)=>{
                
                if(citizen.nid === nid){
                    //call the function to store data in blockchain here 
                    //
                    res.status(200).json(generateWallet(nid))
                }
            })
        }else{
            const error = 'Please insert a valid NID'
            res.status(200).json(generateWallet(error))
        }
    }
)

module.exports = {
    genVoterWallet
}
