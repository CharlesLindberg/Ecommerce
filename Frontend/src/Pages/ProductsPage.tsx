import { useEffect } from "react";
import { LoadProducts } from "../Utilities/LoadProducts";
import { IProduct } from "../models/IProduct";
import { useState } from "react";
import GridList from "../Components/GridList";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await LoadProducts();
      console.log(data);
      setProducts(data.data.products);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  return (
    <div>
      <h1>All products</h1>

      <GridList products={products} />
    </div>
  );
};

export default ProductsPage;
