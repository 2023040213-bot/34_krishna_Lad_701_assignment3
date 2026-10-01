const express = require("express");

const Employee = require("../models/Employee");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET PROFILE
router.get("/profile", authMiddleware, async (req, res) => {

    try {

        const employee = await Employee.findById(
            req.employeeId
        ).select("-password");

        res.json(employee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;