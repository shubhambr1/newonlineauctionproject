const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  currentBid: {
    type: Number,
    default: 0
  },
  endTime: Date,
  bids: [
    {
      amount: Number,
      user: String,
      time: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Item', itemSchema);
