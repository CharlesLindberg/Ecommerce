// 1 - importera beroenden

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productsRoutes from "./routes/products-routes.mjs";

// 2 - Läser in värden från .env-filen och gör dom tillgängliga via process.env
dotenv.config();

const PORT = process.env.PORT || 5001;

// 3. Skapa en express app
const app = express();

// 4. Aktivera middleware
app.use(cors());
app.use(express.json());
app.use("/api/products", productsRoutes);

// 6. Skapa en test route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// 7. stara servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
