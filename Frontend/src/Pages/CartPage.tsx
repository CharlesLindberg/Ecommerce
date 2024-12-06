import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { removeFromCart, addToCart } from "../redux/slices/cartSlice";
import { removeFromCartAPI } from "../Utilities/LoadCart";
import { loadCartItems } from "../Utilities/LoadCart";
import { clearCart } from "../redux/slices/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("Cart items from Redux Store:", cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        dispatch(clearCart()); // Töm rexus store innan jag hämtar data från api

        const items = await loadCartItems(); // hämta cart från backend
        console.log("Items fetched from API:", items);

        items.forEach((item) => {
          dispatch(addToCart(item)); // Lägg till varje objekt i redux store
          console.log(
            `Adding item to Redux Store, iteration ${index + 1}:`,
            item
          );
        });

        console.log("Redux Store after dispatching items:", cartItems);
      } catch (error) {
        console.error("failed to load cart Items: ", error);
      }
    };
    fetchCartItems();
  }, [dispatch]);

  useEffect(() => {
    console.log("cartItems updated in useSelector:", cartItems);
  }, [cartItems]);

  const handleRemove = async (id: number) => {
    console.log("Removing item with id:", id);

    try {
      await removeFromCartAPI(id); // delete req till backend
      console.log("Removing item with id from Redux", id);
      dispatch(removeFromCart(id)); //Uppdatera redux store
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  console.log("Rendering cartItems:", cartItems);

  return (
    <div>
      <h1>Your cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.price} SEK</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
