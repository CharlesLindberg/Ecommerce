import fs from "fs";
import db from "../db.json" assert { type: "json" };
import path from "path";

const dbPath = path.resolve("./Backend/db.json");

// Funktion för att uppdatera db.json
const writeDb = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to db.json:", error.message);
  }
};

// Hämta alla varor i kundkorgen
export const listCartItems = (req, res) => {
  try {
    res.status(200).json({ success: true, data: db.cart });
  } catch (error) {
    console.error("Error in listCartItems", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart items" });
  }
};

// Lägg till en vara i kundkorgen

export const addToCart = (req, res) => {
  const { id, name, price, description, image } = req.body;

  try {
    const existingItem = db.cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { id, name, price, description, image, quantity: 1 };
      db.cart.push(newItem);
    }

    writeDb(db); // Uppdatera db.json

    res.status(201).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error in addToCart: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
};

// Funktion för att radera från kundkorg

export const removeFromCart = (req, res) => {
  const { id } = req.params;

  try {
    const updatedCart = db.cart.filter((item) => item.id !== parseInt(id, 10));

    if (updatedCart.length === db.cart.length) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    db.cart = updatedCart;
    writeDb(db);

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove item from cart" });
  }
};