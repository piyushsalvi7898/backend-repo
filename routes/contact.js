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

router.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    try{
        const _id = req.params.id;
        const contact = await Contact.findByIdAndDelete(_id),
        data =
        
        { id: _id };
        if(!contact){
            res.status(404).send({ message: "Contact not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error deleting contact", error: error.message });
    }
});


// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send({ message: "Error fetching contacts", error: error.message });
    }
});

module.exports = router;