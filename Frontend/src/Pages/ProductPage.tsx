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
        setProduct(fetchedProduct.data);
      } catch (error) {
        console.error("Faile to fetch product details", error);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      console.log("Adding product to cart:", product);

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock,
        quantity: 1,
      };

      try {
        console.log("About to send POST request to backend with:", cartItem);

        await addToCart(cartItem); // POST-req till backend

        dispatch(addToCart(cartItem)); // Skicka till redux store
        console.log("Product successfully added to Redux Store.");
      } catch (error) {
        console.error("Failed to add product to cart", error);
      }
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  console.log(product);

  return (
    <div className={styles.productPage}>
      <div className={styles.imageContainer}>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.infoConteiner}>
        <p>{product.description}</p>
        <p>Pris: {product.price} SEK</p>
        <p>Lagerstatus: {product.stock} /st</p>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
