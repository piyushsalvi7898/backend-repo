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
    try {
        const _id = req.params.id;
        await User.findByIdAndDelete(_id);
        res.json({
            message: 'User deleted successfully',
            data: { id: _id }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});
module.exports = router;


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

module.exports = router;