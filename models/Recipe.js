const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  ingredients:  { type: [String], required: true },
  instructions: { type: String, required: true },
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
