const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const asyncHandler = require('express-async-handler')

const generateKeys = asyncHandler(
    async (req, res) => {
        const { nid } = req.body
        //Key pair should be generated based on NID 
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');

        let voterInfo = {
            'Public key' : publicKey,
            'Private key' : privateKey,
            'nid' : nid
        } 
        res.status(200).json(keyPair)
        const response = await fetch(`${network[i]}/api/chainList`);
        const data = await response.json();

        if (response.status == 200){
            //
        }

        res.status(200).json();
    }
)

module.exports = {
    generateKeys
}
