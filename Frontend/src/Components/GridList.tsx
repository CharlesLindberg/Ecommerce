import { IProduct } from "../models/IProduct";
import ProductItem from "./ProductItem";
import styles from "./GridList.module.css";
import { Link } from "react-router-dom";

const GridList = ({ products }: { products: IProduct[] }) => {
  return (
    <section className={styles.grid}>
      {products.map((product) => (
        <Link to={`/products/${product.id} key={product.id}`}>
          <ProductItem key={product.id} product={product} />
        </Link>
      ))}
    </section>
  );
};

export default GridList;
