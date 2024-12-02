import { useEffect } from "react";
import { LoadProducts } from "../Utilities/LoadProducts";
import { IProduct } from "../models/IProduct";
import { useState } from "react";
import styles from "./ProductsPage.module.css";
import { Link } from "react-router-dom";
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
      {/* <ul className={styles.productsList}>
        {products.map((product) => (
          <Link to={`/products/${product.id}`}>
            <div key={product.id} className={styles.productsDiv}>
              <img src={product.image} alt={product.name} />
              <li key={product.id}>
                {product.name} - {product.price} SEK{" "}
              </li>
            </div>
          </Link>
        ))}
      </ul> */}
      <GridList products={products} />
    </div>
  );
};

export default ProductsPage;
