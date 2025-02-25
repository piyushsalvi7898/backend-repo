const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  experience: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  mobile: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
  },
  reference: { type: String, trim: true },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
