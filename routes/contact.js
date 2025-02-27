const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Create a new contact
router.post('/', async (req, res) => {
    console.log(req.body);  // Add this line to print form data in the backend
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).send({ message: "Contact created successfully!", contact });
    } catch (error) {
        console.error("Error creating contact:", error.message);
        res.status(400).send({ message: "Error creating contact", error: error.message });
    }
});


// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send(
            { message: "Error fetching contacts", error: error.message });
    }
});

router.get("/uniqueId", async (req, res) => {
    try {
      const lastCandidate = await Candidate.findOne().sort({ uniqueId: -1 });
      let newUniqueId = "Yunify-10001"; // Default if no records exist
  
      if (lastCandidate && lastCandidate.uniqueId) {
        const lastIdNumber = parseInt(lastCandidate.uniqueId.split("-")[1], 10);
        newUniqueId = `Yunify-${lastIdNumber + 1}`;
      }
  
      console.log("Generated Unique ID:", newUniqueId); // Debugging log
      res.status(200).json({ uniqueId: newUniqueId });
    } catch (error) {
      console.error("Error fetching unique ID:", error);
      res.status(500).json({ error: "Failed to fetch unique ID" });
    }
  });

module.exports = router;