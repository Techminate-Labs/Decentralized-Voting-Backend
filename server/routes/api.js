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

//citizen
router.post('/citizenCreate', citizenCreate)
router.get('/citizenGetByNid/:id', citizenGetByNid)

//voter
router.post('/validateNid', validateNid)
router.post('/voterRegistration', voterRegistration)
router.get('/voterGetByPubKey/:pk', voterGetByPubKey)
router.get('/voterGetByNid/:nid', voterGetByNid)

module.exports = router