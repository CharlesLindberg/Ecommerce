import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { removeFromCart, addToCart } from "../redux/slices/cartSlice";
import { removeFromCartAPI } from "../Utilities/LoadCart";
import { loadCartItems } from "../Utilities/LoadCart";
import { clearCart } from "../redux/slices/cartSlice";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("Cart items from Redux Store:", cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        dispatch(clearCart()); // Töm rexus store innan jag hämtar data från api
        const items = await loadCartItems(); // hämta cart från backend

        items.forEach((item) => {
          dispatch(addToCart(item)); // Lägg till varje objekt i redux store
        });
      } catch (error) {
        console.error("failed to load cart Items: ", error);
      }
    };
    fetchCartItems();
  }, [dispatch]);

  useEffect(() => {}, [cartItems]);

  const handleRemove = async (id: number) => {
    console.log("Removing item with id:", id);

    try {
      await removeFromCartAPI(id); // delete req till backend
      dispatch(removeFromCart(id)); //Uppdatera redux store
    } catch (error) {}
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Your cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price} SEK</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
            <div className={styles.totalPrice}>Total: {totalPrice} SEK</div>
          </ul>
        )}
      </div>
    </>
  );
};

export default CartPage;
