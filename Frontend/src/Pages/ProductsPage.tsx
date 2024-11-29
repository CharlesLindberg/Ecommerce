import { useEffect } from "react";
import { LoadProducts } from "../Utilities/LoadProducts";
import { Product } from "../models/Product";
import { useState } from "react";
import styles from "./ProductsPage.module.css";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
      <ul className={styles.productsList}>
        {products.map((product) => (
          <Link to={`/products/${product.id}`}>
            <div key={product.id} className={styles.productsDiv}>
              <img src={product.image} alt={product.name} />
              <li key={product.id}>
                {product.name} - {product.price} SEK{" "}
                <p>{product.description}</p>
              </li>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
