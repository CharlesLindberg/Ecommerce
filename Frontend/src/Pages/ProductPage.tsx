import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../Utilities/httpClient";
import { IProductDetails } from "../models/IProductDetails";
import styles from "./ProductPage.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductPage = () => {
  const [product, setProduct] = useState<IProductDetails>();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchData(`/products/${id}`);
        console.log(fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Faile to fetch product details", error);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      );
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  console.log(product);

  return (
    <div className={styles.productPage}>
      <div className={styles.imageContainer}>
        <h1>{product.data.name}</h1>
        <img src={product.data.image} alt={product.name} />
      </div>
      <div className={styles.infoConteiner}>
        <p>{product.data.description}</p>
        <p>Pris: {product.data.price} SEK</p>
        <p>Lagerstatus: {product.data.stock} /st</p>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
