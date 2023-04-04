import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component"
import "./product-card.style.scss";

const ProductCard =({product}) => {
  // Destruture product
  const {name, price, imageUrl} = product;
  const { addItemToCart } = useContext(CartContext);

  // writing function in this way , is easier to optimize later then straight at the onClick
  const addProductToCart = () => addItemToCart(product);

  return(
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}
 export default ProductCard;
