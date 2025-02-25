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

    // Check required fields
    const requiredFields = [
      "name", "fatherName", "dob", "maritalStatus",
      "address", "city", "state", "pincode", "qualification", "stream",
      "passingYear", "experience", "jobTitle", "companyName", "email", "mobile"
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

// Get All Candidates (GET)
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get Candidate by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
