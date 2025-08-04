const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: String,
  profession: String,
  location: String,
  bio: String,
  contact: String,
  profilePicUrl: String,
  proofs: [String],
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
