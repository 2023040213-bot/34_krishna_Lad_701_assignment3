const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://2023040213_db_user:Krishna2311@cluster1.kv7qdjq.mongodb.net/ERP"
        );

        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Error:", err);
    }
};

module.exports = connectDB;