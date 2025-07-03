import express from "express";
import { createProduct, deleted, getAllProduct, updateProduct } from "../Controller/product.controller.js";
import { body } from "express-validator";


const router = express.Router();



router.post("/product",createProduct)
router.get("/product",getAllProduct);
router.put("/product",updateProduct);
router.delete("/product/:id",deleted);

export default router;