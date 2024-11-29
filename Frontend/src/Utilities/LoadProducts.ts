import { fetchData } from "./httpClient";

export const LoadProducts = async () => {
  try {
    const endpoint = "/products"; // Backendserverns endpoint
    const products = await fetchData(endpoint);
    return products;
  } catch (error) {
    console.error("Error loading products: ", error);
    throw error;
  }
};
