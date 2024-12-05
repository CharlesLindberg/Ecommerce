import express from "express";
import {
  listCartItems,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cart-controller.mjs";

const router = express.Router();

// Route för att hämta alla varor i korgen
router.get("/", listCartItems);

router.post("/", addItemToCart);

router.delete("/:id", removeItemFromCart);

export default router;
