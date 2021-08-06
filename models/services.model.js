const mongoose = require("mongoose");
const { Schema } = mongoose; 

const ServiceModel = Schema({
  name: String,
  time: Number,
  state: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 }
});

module.exports = mongoose.model('Service', ServiceModel);