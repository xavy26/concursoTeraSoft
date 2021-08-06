const mongoose = require("mongoose");
const { Schema } = mongoose; 

const TypeFunctionaryModel = Schema({
  name: String,
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


module.exports = mongoose.model('TypeFunctionary', TypeFunctionaryModel);