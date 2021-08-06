const mongoose = require("mongoose");
const { Schema } = mongoose;

const TurnModel = Schema({
  hour: Number,
  date: Date,
  functinary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Functionary"
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

module.exports = mongoose.model('Turn', TurnModel);
