const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  dob: String,
  maritalStatus: String,
  address: String,
  city: String,
  state: String,
  mobile: String,
  alternateNumber: String,
  email: String,
  upiTransactionId: String,
  uniqueId: String
});

module.exports = mongoose.model("Candidate", CandidateSchema);
