const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product
            .find()
            .populate("category")
            .populate("subCategory");

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product
            .findById(req.params.id)
            .populate("category")
            .populate("subCategory");

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ADD product
router.post("/", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            subCategory: req.body.subCategory
        });

        const savedProduct = await product.save();

        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;