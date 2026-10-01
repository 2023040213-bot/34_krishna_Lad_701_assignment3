const express = require("express");

const Category = require("../models/Category");

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST category
router.post("/", async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name
        });

        const savedCategory = await category.save();

        res.json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE category
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category deleted"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;