import CartContainer from "./Components/CartContainer";
import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./Components/Modal";
function App() {
  let { cartItems, isLoading } = useSelector((state) => state.cart);
  let { isOpen } = useSelector((state) => state.modal);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems("chetan"));
  }, []);

  if (isLoading)
    return (
      <>
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      </>
    );
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar></Navbar>
      <CartContainer />
    </main>
  );
}
export default App;
