const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: false
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    message: {
        type:    String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
