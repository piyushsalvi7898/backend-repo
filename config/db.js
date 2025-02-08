const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB..."); // Debugging step
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
