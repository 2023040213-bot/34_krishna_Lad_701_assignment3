const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    empid: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    department: {
        type: String
    },

    salary: {
        type: Number
    }
});

module.exports = mongoose.model("Employee", employeeSchema);