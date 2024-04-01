import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "./../../cartItems";
import { closeModal, openModal } from "../modal/modalSlice";

let url = "https://course-api.com/react-useReducer-cart-project";

// export let getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((result) => result.json())
//     .catch((error) => console.log(error));
// });

export let getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (argument, thunkAPI) => {
    try {
      let result = await fetch(url);
      let json = await result.json();
      console.log(argument);
      console.log(thunkAPI.getState());
      thunkAPI.dispatch(openModal());
      thunkAPI.dispatch(closeModal());
      return json;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue("");
    }
  }
);

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (store) => {
      store.cartItems = [];
    },
    removeCart: (store, action) => {
      let id = action.payload;
      store.cartItems = store.cartItems.filter((value) => value.id !== id);
    },
    increase: (store, { payload: { id } }) => {
      let cartItem = store.cartItems.find((item) => item.id === id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (store, { payload: { id } }) => {
      let cartItem = store.cartItems.find((item) => item.id === id);
      cartItem.amount -= 1;
    },
    toggleIncDec: (store, { payload: { id }, payload: { toggle } }) => {
      let cartItem = store.cartItems.find((item) => item.id === id);
      if (toggle === "increase") cartItem.amount += 1;
      else cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  // extraReducers: {
  //   [getCartItems.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.cartItems = action.payload;
  //   },
  //   [getCartItems.rejected]: (state, action) => {
  //     console.log(action);
  //     state.isLoading = false;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

console.log(cartSlice);

export let {
  clearCart,
  removeCart,
  increase,
  decrease,
  toggleIncDec,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
