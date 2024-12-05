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
export const addToCartAPI = async (item: ICartItem): Promise<void> => {
  console.log("Attempting POST request to /cart with:", item);
  try {
    const endpoint = "/cart";
    console.log("Sending POST request to:", endpoint, "with item:", item);

    console.log("Attempting POST request to /cart with:", item);

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
export const removeFromCartAPI = async (id: number): Promise<void> => {
  try {
    const endpoint = `/cart/${id}`;
    console.log("Attempting to DELETE item with id:", id);
    const response = await fetchData(endpoint, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Failed to delete item with id ${id}`);
    }

    console.log(
      `Item with id ${id} successfully removed from backend`,
      response
    );
  } catch (error) {
    console.error("Error removing from cart: ", error);
  }
};
