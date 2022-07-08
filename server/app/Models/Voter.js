const mongoose = require('mongoose')

const voterSchema = mongoose.Schema(
  {
    nid: {
      type: String,
    },
    pubKey: {
      type: String,
    },
    vote: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Voter', voterSchema)
