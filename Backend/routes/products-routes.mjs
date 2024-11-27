import express from "express";
import {
  listProducts,
  findProduct,
} from "./controllers/products-controller.mjs";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", findProduct);

export default router;
