import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import BraintreeCheckout from "../paymentGateways/braintreeCheckout";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "../paymentGateways/stripeCheckout";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      let data = loadCart();
      if (data != undefined) setProducts(data);
   }, [reload]);
   // <-------- Load Products in the Cart ---------->
   const loadAllProducts = (products) => {
      return (
         <div>
            {" "}
            <h2>Products</h2>
            {products.map((product, index) => {
               return (
                  <div>
                     <Card
                        key={index}
                        product={product}
                        addtoCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload}
                     />
                  </div>
               );
            })}
         </div>
      );
   };

   // <--------- Checkout Side Data Load ------->
   const loadCheckout = () => {
      return (
         <div>
            <h2>Checkout</h2>
         </div>
      );
   };

   return (
      <div>
         <Base />
         <div className="row">
            <h1>Cart</h1>
            <div className="col-6">
               {products.length > 0 ? (
                  loadAllProducts(products)
               ) : (
                  <h3>Your cart is empty</h3>
               )}
            </div>
            <div className="col-6">
               <StripeCheckout products={products} setReload={setReload} />
            </div>
         </div>
      </div>
   );
};
export default Cart;
