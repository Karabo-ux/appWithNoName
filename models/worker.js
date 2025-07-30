const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: String,
  profession: String,
  bio: String,
  location: String,
  contact: String,
  profilePicUrl: String,
  proofs: [String], // Array of proof image URLs
}, { timestamps: true }); // Adds createdAt & updatedAt fields

module.exports = mongoose.model('Worker', workerSchema);
