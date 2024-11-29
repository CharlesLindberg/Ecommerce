import {
  listProducts,
  findProduct,
} from "../controllers/products-controller.mjs";
import express from "express";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", findProduct);

export default router;
