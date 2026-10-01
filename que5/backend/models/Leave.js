const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },

    date: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    grant: {
        type: String,
        default: "No"
    }
});

module.exports = mongoose.model("Leave", leaveSchema);