const mongoose = require("mongoose");
const { Schema } = mongoose; 

const FunctionaryModel = Schema({
  name: String,
  dni: String,
  email: String,
  password: String,
  state: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  schelude: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schelude"
  },
  type_functinary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeFunctionary"
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 }
});

module.exports = mongoose.model('Functionary', FunctionaryModel);