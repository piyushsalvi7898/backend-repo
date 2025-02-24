const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, required: true },
  maritalStatus: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  qualification: { type: String, required: true },
  stream: { type: String, required: true },
  passingYear: { type: Number, required: true },
  experience: { type: String, required: true },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  reference: { type: String },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
