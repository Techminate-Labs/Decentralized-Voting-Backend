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
            'nid' : nid
        }

        return voterInfo;
    }

const voterWallet = asyncHandler(
    async (req, res) => {
        const { nid } = req.body
        const url = 'http://localhost:8080/citizen'
        const response = await fetch(url);
        const data = await response.json();

        if (response.status == 200){
            data.map((citizen)=>{
                if(citizen.id === nid){
                    const voterInfo =  generateWallet(nid)
                    res.status(200).json(generateWallet(nid))
                }
            })
        }

        res.status(200).json();
    }
)

module.exports = {
    generateKeys
}
