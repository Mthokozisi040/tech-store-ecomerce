import express from 'express';
import { getProduct,getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productContoller.js';

const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;