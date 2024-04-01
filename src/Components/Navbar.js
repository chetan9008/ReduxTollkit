import { CartIcon } from "../icons";
// import { Testing } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  let { amount } = useSelector((store) => store.cart);
  return (
    <nav>
      {/* <Testing></Testing> */}
      <div className="nav-center">
        <h3>Redux Toolkit</h3>
        <div className="nav-container">
          <CartIcon></CartIcon>
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
