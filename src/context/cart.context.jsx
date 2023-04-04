import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
// cartItems is existing Items in the cart
// productToAdd is newly added product into the cart
// 1. find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItems)=> cartItems.id === productToAdd.id);

// 2. If found, increment quantity
// ...cartItem is existing fields(e.g. id, name, imageUrl, price & quantity)
  if(existingCartItem) {
    return cartItems.map( (cartItem) =>
      cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }

// 3. else return new array with modified cartItems/ new cart item
// ...productToAdd is existing fields(e.g. id, name, imageUrl, price),
// create a new field call quantity
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
// find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItems)=> cartItems.id === cartItemToRemove.id);

// check if quantity is equal to 1, if it is is remove that item from cart
  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

// return cart items with matching cart item with reduced quantity
  if(existingCartItem) {
    return cartItems.map( (cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
  }

};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext =  createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart:() => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);

    const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);


  // console.log("cartItems", cartItems);
  // console.log("cartCount", cartCount);
  // console.log("cartTotal", cartTotal);


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems,productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems,cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems,cartItemToClear));

  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal };

  return<CartContext.Provider value={value}>{children}</CartContext.Provider>
};
