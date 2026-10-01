const express = require("express");

const SubCategory = require("../models/SubCategory");

const router = express.Router();

// GET all subcategories
router.get("/", async (req, res) => {
    try {
        const subCategories = await SubCategory
            .find()
            .populate("category");

        res.json(subCategories);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST subcategory
router.post("/", async (req, res) => {
    try {
        const subCategory = new SubCategory({
            name: req.body.name,
            category: req.body.category
        });

        const savedSubCategory = await subCategory.save();

        res.json(savedSubCategory);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE subcategory
router.delete("/:id", async (req, res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id);

        res.json({
            message: "Subcategory deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;