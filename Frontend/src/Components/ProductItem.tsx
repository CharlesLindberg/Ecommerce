import { IProduct } from "../models/IProduct";
import styles from "./ProductItem.module.css";

const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <div className={styles.productItem}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} SEK</p>
    </div>
  );
};

export default ProductItem;
