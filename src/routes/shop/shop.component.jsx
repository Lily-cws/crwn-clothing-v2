import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import ProductCard from "../../components/product/product-card.component";
import "./shop.styles.scss";
// import SHOP_DATA from "../../shop-data.json";


const Shop =  () => {
  const { products } = useContext(ProductsContext);

  // console.log("Shop products", products);

  return (
    <div className="product-container">
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
          )
        )
      }
    </div>
  )

};

export default Shop;
