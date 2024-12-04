import express from "express";
import {
  listCartItems,
  addToCart,
  removeFromCart,
} from "../controllers/cart-controller.mjs";

const router = express.Router();

// Route för att hämta alla varor i korgen
router.get("/", listCartItems);

router.post("/", addToCart);

router.delete("/:id", removeFromCart);

export default router;
