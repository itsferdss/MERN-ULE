import expres from "express";
import mongoose from "mongoose";

import Product from "../models/productModel.js";
const router = express.Router();

router.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get products" });
    }
})

router.post("/api/products", async (req, res) => {
    const product = req.body;

    if(!product.name || !product.image || !product.price || !product.quantity) {
        return res.status(404).json({ success:false, message: "Please provide all the fields"});
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch(err) {
        res.status(500);
        console.error(err).json({ success: false, message:"Failed to save product"});
    }
})

router.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:"Product deleted successfully"});
    } catch(err) {
        res.status(500).json({ success: false, message: "Product not found"});
    }
})

router.patch("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    const {name, image, price, quantity} = req.body;

    const updatedProduct = {name, image, price, quantity};

    try{
        const updated = await Product.findByIdAndUpdate(id, updatedProduct, {new: true});
        res.status(200).json({ success: true, data: updated });
    } catch(err) {
        res.status(500).json({ success: false, message: "Product not found"});
    }
})

export default router;