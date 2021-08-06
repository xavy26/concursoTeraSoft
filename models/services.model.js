const mongoose = require("mongoose");
const { Schema } = mongoose; 

const ServiceModel = Schema({
  service_name: String,
  time: Number,
  state: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 }
});

module.exports = mongoose.model('Service', ServiceModel);