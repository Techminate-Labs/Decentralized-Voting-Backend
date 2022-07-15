const express = require('express')
const router = express.Router()

const {
    citizenGetByNid,
    citizenCreate

} = require('../app/Controllers/CitizenController')

const {
    validateNid,
    voterRegistration,
    voterGetByPubKey,
    voterGetByNid
} = require('../app/Controllers/VoterController')

const {
    chainList,
    transactionCreate,
    minePendingTxs,
    chainValidation,
    nodeConnection,
    chainSync
} = require('../app/Controllers/BlockchainController')

//blockchain
router.post('/transactionCreate', transactionCreate)
router.get('/minePendingTxs', minePendingTxs)
router.get('/chainList', chainList)
router.get('/chainValidation', chainValidation)
router.post('/nodeConnection', nodeConnection)
router.get('/chainSync', chainSync)

//citizen
router.post('/citizenCreate', citizenCreate)
router.get('/citizenGetByNid/:id', citizenGetByNid)

//voter
router.post('/validateNid', validateNid)
router.post('/voterRegistration', voterRegistration)
router.get('/voterGetByPubKey/:pk', voterGetByPubKey)
router.get('/voterGetByNid/:nid', voterGetByNid)


module.exports = router