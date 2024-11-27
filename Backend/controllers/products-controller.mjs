// Hantera logiken för att lista alla produkter och visa enskilda produkters detaljer. Controllers är där vi hanterar logiken för API-anrop. Det gör koden organiserad och följer Single Responsibility Principle (SRP).

import { fetchData } from "../utilities/httpClient.mjs";

export const listProducts = async (req, res) => {
  try {
    const products = await fetchData("/products");
    res.status(200).json({ success: false, message: error.message });
  } catch (error) {
    throw new Error("Error in listProducts", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const findProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await fetchData("/products/${id}");
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in findProduct", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
