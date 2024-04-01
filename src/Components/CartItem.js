import { ChevronDown, ChevronUp } from "./../icons";
import { removeCart,toggleIncDec } from "../features/cart/cartSlice";
// import { increase,decrease } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ id, img, title, price, amount }) => {
  let dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => {
          dispatch(removeCart(id));
        }}>remove</button>
      </div>
      <div>
        <button className="amount-btn"
          onClick={() => {
            // dispatch(increase({id}));
            dispatch(toggleIncDec({id,toggle:'increase'}));
        }}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn"
          onClick={() => {
            if (amount === 1)
              dispatch(removeCart(id));
            // dispatch(decrease({ id }));
            dispatch(toggleIncDec({id,toggle:'decrease'}));
        }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
