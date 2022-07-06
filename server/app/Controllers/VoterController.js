const asyncHandler = require('express-async-handler');
const { status } = require('express/lib/response');
const Blockchain = require('../Blockchain/Blockchain');
const Transaction = require('../Blockchain/Transaction');
const { isChainValid } = require('../Blockchain/Validation');
const { ConnectNodes } = require('../Blockchain/Network');

const EC = require('elliptic').ec;

let myChain = new Blockchain();

const registerVoter = asyncHandler(
    async (req, res) => {
        // NID number, public key
        res.status(200).json()
    }
)

const voterList = asyncHandler(
    async (req, res) => {
        res.status(200).json()
    }
)


module.exports = {
    registerVoter,
    voterList
}