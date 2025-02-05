import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.style.scss";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemToCart, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container" >
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

        {
          cartItems.map((items)=> <CheckOutItem key={items.id} cartItem={items}/>)
        }
        <span className="total">Total: ${cartTotal || 0}</span>
    </div>
  );
};

export default Checkout;
