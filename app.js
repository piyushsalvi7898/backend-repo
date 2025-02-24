const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Import Routes
const contactRoutes = require("./routes/contact");
const candidateRoutes = require("./routes/candidate"); // Import candidate route

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// API Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/candidates", candidateRoutes); // Candidate API

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
