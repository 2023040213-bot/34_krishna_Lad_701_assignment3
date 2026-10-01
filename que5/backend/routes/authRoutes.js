const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employee = require("../models/Employee");

const router = express.Router();


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const employee = await Employee.findOne({
            email: email
        });

        if (!employee) {
            return res.status(400).json({
                message: "Employee not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            employee.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            {
                id: employee._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// CREATE EMPLOYEE
router.post("/register", async (req, res) => {

    try {

        const {
            empid,
            name,
            email,
            password,
            department,
            salary
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = new Employee({
            empid,
            name,
            email,
            password: hashedPassword,
            department,
            salary
        });

        await employee.save();

        res.json({
            message: "Employee created successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;