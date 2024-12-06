import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../models/ICartItem";

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      console.log("Reducer running, adding item to state:", action.payload);
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      console.log("State after addToCart in reducer:", state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      console.log("Removing item with id from Redux:", action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      console.log("Clearing Redux Store...");
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
