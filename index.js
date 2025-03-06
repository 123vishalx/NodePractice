require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const personRoutes = require("./Routes/PersonRoute"); 
const adminRoutes = require("./Routes/Admin");

const app = express();
const PORT =  4000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Middleware to log request time and route
app.use((req, res, next) => {
  const timestamp = new Date().toISOString(); // Get current time
  console.log(`[${timestamp}] ${req.method} request made to: ${req.originalUrl}`);
  next(); // Move to the next middleware/route handler
});

// Use Routes
app.use("/person", personRoutes);

app.use("/admin", adminRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running with MongoDB!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
