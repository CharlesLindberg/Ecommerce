// Hantera logiken för att lista alla produkter och visa enskilda produkters detaljer. Controllers är där vi hanterar logiken för API-anrop. Det gör koden organiserad och följer Single Responsibility Principle (SRP).

// import { fetchData } from "../utilities/httpClient.mjs";
// import products from "../db.json" assert { type: "json" };

// export const listProducts = async (req, res) => {
//   try {
//     const products = await fetchData("/products");
//     res.status(200).json({ success: true, message: error.message });
//   } catch (error) {
//     console.error("Error in listProducts: ", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch products" });
//   }
// };
// export const findProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = products.find((product) => product.id === parseInt(id, 10));
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }
//     res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     console.error("Error in findProduct:", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch product" });
//   }
// };

//     const product = await fetchData("/products/${id}");
//     res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     console.error("Error in findProduct", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import products from "../db.json" assert { type: "json" };

export const listProducts = (req, res) => {
  try {
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in listProducts:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

export const findProduct = (req, res) => {
  const { id } = req.params; // Hämta ID från request-parametrarna
  try {
    const product = products.find((product) => product.id === parseInt(id, 10));
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in findProduct:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};
