
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dns = require("dns");
const bcrypt = require("bcrypt");

const Employee = require("./models/Employee");

const app = express();


// ========================
// MongoDB DNS
// ========================

dns.setServers(["8.8.8.8", "8.8.4.4"]);


// ========================
// MongoDB Connection
// ========================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Error:", err);
    });


// ========================
// EJS
// ========================

app.set("view engine", "ejs");


// ========================
// Middleware
// ========================

app.use(
    express.urlencoded({
        extended: true
    })
);


// ========================
// Session
// ========================

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);


// ========================
// Admin Login Page
// ========================

app.get("/", (req, res) => {

    res.render("login");

});


// ========================
// Admin Login
// ========================

app.post("/login", (req, res) => {

    const {
        username,
        password
    } = req.body;

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        req.session.admin = true;

        res.redirect("/dashboard");

    } else {

        res.send("Invalid Admin Login");

    }

});


// ========================
// Authentication Middleware
// ========================

function isAdmin(req, res, next) {

    if (req.session.admin) {

        next();

    } else {

        res.redirect("/");

    }

}


// ========================
// Dashboard
// ========================

app.get(
    "/dashboard",
    isAdmin,
    async (req, res) => {

        try {

            const employees = await Employee.find();

            res.render("dashboard", {
                employees: employees
            });

        } catch (error) {

            console.log("Dashboard Error:", error);

            res.send("Error loading employees");

        }

    }
);


// ========================
// Add Employee Page
// ========================

app.get(
    "/employee/add",
    isAdmin,
    (req, res) => {

        res.render("addEmployee");

    }
);


// ========================
// Generate Employee ID
// ========================

function generateEmpId() {

    return "EMP" + Date.now();

}


// ========================
// Generate Password
// ========================

function generatePassword() {

    return Math.random()
        .toString(36)
        .slice(-8);

}


// ========================
// Add Employee
// ========================

app.post(
    "/employee/add",
    isAdmin,
    async (req, res) => {

        try {

            const {
                name,
                email,
                basicSalary
            } = req.body;


            // ========================
            // Generate Employee ID
            // ========================

            const empid = generateEmpId();


            // ========================
            // Generate Password
            // ========================

            const plainPassword = generatePassword();


            // ========================
            // Encrypt Password
            // ========================

            const hashedPassword =
                await bcrypt.hash(
                    plainPassword,
                    10
                );


            // ========================
            // Salary Calculation
            // ========================

            const basic = Number(basicSalary);

            const hra = basic * 0.20;

            const da = basic * 0.10;

            const totalSalary =
                basic + hra + da;


            // ========================
            // Create Employee
            // ========================

            const employee =
                new Employee({

                    empid: empid,

                    name: name,

                    email: email,

                    basicSalary: basic,

                    hra: hra,

                    da: da,

                    totalSalary: totalSalary,

                    password: hashedPassword

                });


            // ========================
            // Save Employee
            // ========================

            await employee.save();


            // ========================
            // Console Information
            // ========================

            console.log(
                "Employee added successfully"
            );

            console.log(
                "Employee ID:",
                empid
            );

            console.log(
                "Generated Password:",
                plainPassword
            );


            // ========================
            // Redirect Dashboard
            // ========================

            res.redirect("/dashboard");


        } catch (error) {

            console.log(
                "Employee Add Error:",
                error
            );

            res.send(
                "Error while adding employee"
            );

        }

    }
);


// ========================
// Delete Employee
// ========================

app.get(
    "/employee/delete/:id",
    isAdmin,
    async (req, res) => {

        try {

            await Employee.findByIdAndDelete(
                req.params.id
            );

            res.redirect("/dashboard");

        } catch (error) {

            console.log(
                "Delete Error:",
                error
            );

            res.send(
                "Error while deleting employee"
            );

        }

    }
);


// ========================
// Edit Employee Page
// ========================

app.get(
    "/employee/edit/:id",
    isAdmin,
    async (req, res) => {

        try {

            const employee =
                await Employee.findById(
                    req.params.id
                );

            res.render(
                "editEmployee",
                {
                    employee: employee
                }
            );

        } catch (error) {

            console.log(
                "Edit Page Error:",
                error
            );

            res.send(
                "Error loading employee"
            );

        }

    }
);


// ========================
// Update Employee
// ========================

app.post(
    "/employee/edit/:id",
    isAdmin,
    async (req, res) => {

        try {

            const {
                name,
                email,
                basicSalary
            } = req.body;


            // ========================
            // Salary Calculation
            // ========================

            const basic =
                Number(basicSalary);

            const hra =
                basic * 0.20;

            const da =
                basic * 0.10;

            const totalSalary =
                basic + hra + da;


            // ========================
            // Update Employee
            // ========================

            await Employee.findByIdAndUpdate(
                req.params.id,
                {
                    name: name,

                    email: email,

                    basicSalary: basic,

                    hra: hra,

                    da: da,

                    totalSalary: totalSalary
                }
            );


            res.redirect("/dashboard");


        } catch (error) {

            console.log(
                "Update Error:",
                error
            );

            res.send(
                "Error while updating employee"
            );

        }

    }
);


// ========================
// Logout
// ========================

app.get(
    "/logout",
    (req, res) => {

        req.session.destroy(() => {

            res.redirect("/");

        });

    }
);


// ========================
// Start Server
// ========================

app.listen(
    3000,
    () => {

        console.log(
            "Server running at http://localhost:3000"
        );

    }
);
