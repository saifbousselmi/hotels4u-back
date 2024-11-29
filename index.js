const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for specific origin (e.g., localhost:3000 for development)
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual URL of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Use this instead of app.use(cors()) if specifying the origin

app.use(express.json());

require('dotenv').config();

const PORT = process.env.PORT || 7000;
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`⚡⚡⚡ Server is running on http://127.0.0.1:${PORT}`);
});

const connectDB = require('./config/connectDB');
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/hotels", require('./routes/hotelRoutes'));
app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/admin", require('./routes/adminRoutes'));
