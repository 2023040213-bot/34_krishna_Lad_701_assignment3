require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

// Configure DNS for MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error.message);
    });


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/employee", employeeRoutes);

app.use("/api/leave", leaveRoutes);


// Home
app.get("/", (req, res) => {

    res.send("Employee API is running");

});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});