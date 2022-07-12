const express = require('express')
const router = express.Router()

const {
    citizenGetByNid,
    citizenCreate

} = require('../app/Controllers/CitizenController')

const {
    validateNid,
    voterRegistration
} = require('../app/Controllers/WalletController')
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
router.get('/validateNid', validateNid)
router.post('/voterRegistration', voterRegistration)


module.exports = router