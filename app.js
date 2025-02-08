const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import database connection
require('dotenv').config(); // Load environment variables
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.use('/api/contacts', contactRoutes); // Use your contact routes



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
