const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// Create Candidate (POST)
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging log

    // Fetch the last candidate to determine the next unique ID
    const lastCandidate = await Candidate.findOne().sort({ uniqueId: -1 });
    let newUniqueId = "Yunify-10001"; // Default if no records exist

    if (lastCandidate && lastCandidate.uniqueId) {
      const lastIdNumber = parseInt(lastCandidate.uniqueId.split("-")[1], 10);
      newUniqueId = `Yunify-${lastIdNumber + 1}`;
    }

    // Assign the generated uniqueId to the request body
    req.body.uniqueId = newUniqueId;

    // Debugging log to check the candidate data before saving
    console.log("Candidate Data to Save:", req.body);

    const requiredFields = [
      "name", "dob", "address", "qualification", "experience", "email", "mobile", "reference"
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Create and save the new candidate
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();

    res.status(201).json({ message: "Candidate registered successfully!", uniqueId: newUniqueId });
  } catch (error) {
    console.error("Error saving candidate:", error);

    // Handle duplicate key errors (email, mobile)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email, Mobile, or Unique ID already exists" });
    }

    res.status(400).json({ error: error.message });
  }
});

// Get Unique ID (GET)
router.get("/uniqueId", async (req, res) => {
  try {
    const lastCandidate = await Candidate.findOne().sort({ uniqueId: -1 });
    let newUniqueId = "Yunify-10001"; // Default if no records exist

    if (lastCandidate && lastCandidate.uniqueId) {
      const lastIdNumber = parseInt(lastCandidate.uniqueId.split("-")[1], 10);
      newUniqueId = `Yunify-${lastIdNumber + 1}`;
    }

    res.status(200).json({ uniqueId: newUniqueId });
  } catch (error) {
    console.error("Error fetching unique ID:", error);
    res.status(500).json({ error: "Failed to fetch unique ID" });
  }
});

module.exports = router;