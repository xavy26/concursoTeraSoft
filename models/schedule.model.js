const mongoose = require("mongoose");
const { Schema } = mongoose; 

const ScheludeModel = Schema({
  days:[String],
  work_day_one: {
    start: Number,
    end: Number,
  },
  work_day_two: {
    start: Number,
    end: Number,
  },
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

module.exports = mongoose.model('Schelude', ScheludeModel);