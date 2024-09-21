import express from 'express';
import core from "cors"
// Import routes
import userRoute from './routes/userRoutes.js';
import connectDB from './config/db.js';


const app = express();
connectDB();

// Middleware to parse JSON data
app.use(express.json());
app.use(core());

// POST request handler
app.use("/users", userRoute);

// Start the server
app.listen(8000, function () {
    console.log(`Server is running on port 8000`);
});
