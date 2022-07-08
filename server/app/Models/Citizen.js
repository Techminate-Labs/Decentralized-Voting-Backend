const mongoose = require('mongoose')

const citizenSchema = mongoose.Schema(
  {
    nid: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Citizen', citizenSchema)
