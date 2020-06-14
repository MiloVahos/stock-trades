const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validTypes = {
  values: ['sell', 'buy'],
  message: '{VALUE}, is not a valid type'
};

const tradesSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, 'id is required'],
  },
  type: { 
    type: String,
    default: 'USER_ROLE',
    enum: validTypes,
    required: true,
  },
  user: {
    type: [{
      id: { 
        type: String, 
        required: [true, 'id is required'] },
      name: { 
        type: String,
        required: [true, 'name is required'] },
    }],
    required: [true, 'user is required with id and name'],
  },
  symbol: { type: String, required: [true, 'Symbol is required'] },
  shares: {
    type: Number,
    required: [true, 'Shares value is required'],
    min: [10, 'Minimum value is 10'],
    max: [30, 'Maximum value is 30'],
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [130.42, 'Minimum value is 130.42'],
    max: [195.65, 'Maximum value is 195.65'],
  },
  timestamp: { type: Date, required: [true, 'Time']}
});

module.exports = mongoose.model('Trades', tradesSchema);