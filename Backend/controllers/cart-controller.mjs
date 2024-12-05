import fs from "fs";
import db from "../db.json" assert { type: "json" };
import path from "path";

console.log("Current working directory:", process.cwd());

// const dbPath = "./Backend/db.json";
const dbPath = path.resolve("db.json");

// Funktion för att uppdatera db.json
const writeDb = (data) => {
  try {
    console.log("Attempting to write to db.json at:", dbPath);
    console.log("Data being written:", JSON.stringify(data, null, 2));
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log("db.json successfully updated!");
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

export const addItemToCart = (req, res) => {
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
    console.log("Updated cart:", db.cart);

    res.status(201).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error in addToCart: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
};

// Funktion för att radera från kundkorg

export const removeItemFromCart = (req, res) => {
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
