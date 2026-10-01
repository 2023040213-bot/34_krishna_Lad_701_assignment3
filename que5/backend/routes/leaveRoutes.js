const express = require("express");

const Leave = require("../models/Leave");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ADD LEAVE
router.post("/", authMiddleware, async (req, res) => {

    try {

        const {
            date,
            reason,
            grant
        } = req.body;

        const leave = new Leave({

            employeeId: req.employeeId,

            date: date,

            reason: reason,

            grant: grant
        });

        await leave.save();

        res.json({
            message: "Leave application added"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// LIST LEAVES
router.get("/", authMiddleware, async (req, res) => {

    try {

        const leaves = await Leave.find({
            employeeId: req.employeeId
        });

        res.json(leaves);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;