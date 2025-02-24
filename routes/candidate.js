const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidateModel");

// ✅ POST: Save Candidate Registration Data
router.post("/", async (req, res) => {
  try {
    console.log("Received candidate data:", req.body);

    if (!req.body.name || !req.body.mobile || !req.body.email) {
      return res.status(400).json({ message: "Name, Mobile, and Email are required!" });
    }

    const existingCandidate = await Candidate.findOne({ uniqueId: req.body.uniqueId });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate with this unique ID already exists!" });
    }

    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json({ message: "Candidate registered successfully!", data: newCandidate });

  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET: Generate Unique Candidate ID
router.get("/uniqueId", async (req, res) => {
  try {
    console.log("Generating unique ID...");

    const lastCandidate = await Candidate.findOne().sort({ _id: -1 });

    let lastId = 10000; // Default starting ID

    if (lastCandidate && lastCandidate.uniqueId) {
      const idParts = lastCandidate.uniqueId.split("-");
      if (idParts.length === 2 && !isNaN(idParts[1])) {
        lastId = parseInt(idParts[1]);
      }
    }

    const newId = `Yunify-${lastId + 1}`;
    console.log("Generated unique ID:", newId);
    res.json({ uniqueId: newId });

  } catch (error) {
    console.error("Error generating unique ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
