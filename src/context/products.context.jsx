import {createContext, useState} from "react";
import PRODUCTS from "../shop-data.json";

// as the actual value that you want to access
export const ProductsContext = createContext({
  products: []
});

// as the provider , the actual component
export const ProductsProvider = ({children}) => {
  const [products, setProducts] =  useState(PRODUCTS);
  const value = {products, setProducts};

  return(
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}
