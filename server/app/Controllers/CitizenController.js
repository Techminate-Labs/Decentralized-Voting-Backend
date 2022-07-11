const asyncHandler = require('express-async-handler')

const Citizen = require('../models/Citizen')

const citizenGetByNid = asyncHandler(
    async (req, res) => {
        const nid = req.params.id;
        const citizen = await Citizen.findOne({"nid":nid});

        if(!citizen) {
            res.status(400)
            throw new Error('Nid is not valid')
        }

        res.status(200).json(citizen)
    }
)

const citizenCreate = asyncHandler(
    async (req, res) => {
        const { nid, name } = req.body

        if (!name || !nid) {
            res.status(400)
            throw new Error('Please fill all fields')
        }
        const citizen = await Citizen.create({
            name: name,
            nid: nid,
        })

        res.status(201).json({
            message:'citizen created successfully',
            citizen: citizen
        })
    }
)

module.exports = {
    citizenGetByNid,
    citizenCreate
}