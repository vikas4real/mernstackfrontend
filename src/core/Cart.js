import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import "../core/css/cart-style.css";
import Base from "./Base";
import { loadCart, getFinalPrice } from "./helper/cartHelper"; // Import getFinalPrice
import StripeCheckout from "../paymentGateways/stripeCheckout";
import ProductCart from "./Components/Product-cart";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);
   const [finalPrice, setFinalPrice] = useState(0);

   useEffect(() => {
      let data = loadCart();
      if (data != undefined) {
         setProducts(data);
      }
      const total = getFinalPrice();
      setFinalPrice(total);
   }, [reload]);

   const loadAllProducts = (products) => {
      return (
         <div className="shopping-cart dark">
            <div className="container">
               {products.map((product, index) => {
                  return (
                     <div key={index} className="row">
                        <div className="col-md-12 col-lg-8">
                           <div className="items">
                              <div className="row">
                                 <div className="product">
                                    <ProductCart
                                       product={product}
                                       setReload={setReload}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      );
   };

   return (
      <div>
         <Base />
         <div className="row mt-5">
            {products.length > 0 ? (
               <>
                  <div className="col-lg-9 col-md-8 col-sm-12">
                     {loadAllProducts(products)}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 text-center">
                     <StripeCheckout
                        products={products}
                        setReload={setReload}
                        finalPrice={finalPrice}
                     />
                  </div>
               </>
            ) : (
               <div className="container-fluid">
                  <div className="row">
                     <div className="container mt-5 mb-5 col-lg-12 col-md-6 col-sm-12 text-center">
                        <div className="empty-cart">
                           <div className="card-body cart">
                              <div className="col-sm-12 empty-cart-cls text-center">
                                 <i
                                    style={{ fontSize: "100px" }}
                                    className="fas fa-shopping-cart mb-4"
                                 ></i>
                                 <h3>
                                    <strong>Your cart is Empty</strong>
                                 </h3>
                                 <h4>Add something to make me happy !!</h4>
                                 <Link
                                    style={{ textDecoration: "none" }}
                                    className="btn btn-success"
                                    to="/"
                                 >
                                    Continue Shopping
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Cart;
