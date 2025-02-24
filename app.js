const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import database connection
require("dotenv").config(); // Load environment variables

// Import Routes
const contactRoutes = require("./routes/contact");
const candidateRoutes = require("./routes/candidate"); // ✅ Added candidate routes

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/contacts", contactRoutes); //  Contact API
app.use("/api/candidates", candidateRoutes); //  Candidate Registration API





// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
