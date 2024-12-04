import { fetchData } from "./httpClient";
import { ICartItem } from "../models/ICartItem";

// Hämta alla varor från kundkorgen (från backend)
export const loadCartItems = async (): Promise<ICartItem[]> => {
  try {
    const endpoint = "/cart";
    const cartItems = await fetchData(endpoint);
    return cartItems.data;
  } catch (error) {
    console.error("Error loading cart items", error);
    throw error;
  }
};

// Lägg till en vara i kundkorgen
export const addToCart = async (item: ICartItem): Promise<void> => {
  try {
    const endpoint = "/cart";
    const response = await fetchData(endpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(item),
    });

    console.log("Added to cart:", response);
  } catch (error) {
    console.error("Error adding to cart: ", error);
    throw error;
  }
};

// Ta bort en vara från cart
export const removeFromcCart = async (id: number): Promise<void> => {
  try {
    const endpoint = `/cart/${id}`;
    const response = await fetchData(endpoint, { method: "DELETE" });
    return response;
  } catch (error) {
    console.error("Error removing from cart: ", error);
  }
};
