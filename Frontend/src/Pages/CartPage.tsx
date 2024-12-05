import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { removeFromCart, addToCart } from "../redux/slices/cartSlice";
import { removeFromCartAPI } from "../Utilities/LoadCart";
import { loadCartItems } from "../Utilities/LoadCart";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("Cart items from Redux Store:", cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await loadCartItems();
        console.log("Items fetched from API:", items); // Kontrollera backend-data här

        items.forEach((item) => {
          dispatch(addToCart(item)); // Lägg till varje objekt i redux store
        });
      } catch (error) {
        console.error("failed to load cart Items: ", error);
      }
    };
    fetchCartItems();
  }, [dispatch]);

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
