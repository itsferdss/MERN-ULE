import express from "express";
import {
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} from "../controllers/productController.js"

const router = express.Router();



router.get("/", getProduct)

router.post("/", createProduct)

router.delete("/:id", deleteProduct)

router.patch("/:id", updateProduct)

export default router;