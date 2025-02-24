const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: String,
  dob: String,
  maritalStatus: String,
  address: String,
  city: String,
  state: String,
  mobile: { type: String, required: true },
  alternateNumber: String,
  email: { type: String, required: true, unique: true },
  upiTransactionId: String,
  uniqueId: { type: String, required: true, unique: true } // ✅ Required & unique
});

module.exports = mongoose.model("Candidate", CandidateSchema);
