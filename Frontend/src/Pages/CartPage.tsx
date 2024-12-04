import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
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
