const mongoose = require('mongoose')

const candidateSchema = mongoose.Schema(
  {
    name: {
        type: Number,
    },
    symbol: {
        type: Number,
    },
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

module.exports = mongoose.model('Candidate', candidateSchema)
