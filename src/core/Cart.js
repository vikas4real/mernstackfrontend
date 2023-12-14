import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import "../core/css/cart-style.css";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "../paymentGateways/stripeCheckout";
import ProductCart from "./Components/Product-cart";

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
         <div class="shopping-cart dark">
            <div className="container">
               {products.map((product, index) => {
                  return (
                     <div class="row">
                        <div class="col-md-12 col-lg-8">
                           <div class="items">
                              <div class="row">
                                 <div class="product">
                                    <ProductCart
                                       key={index}
                                       product={product}
                                       addtoCart={false}
                                       removeFromCart={true}
                                       setReload={setReload}
                                       reload={reload}
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
            <div className="col-12">
               {products.length > 0 ? (
                  loadAllProducts(products)
               ) : (
                  <div class="container-fluid">
                     <div class="row">
                        <div class="container mt-5 mb-5 col-lg-12 col-md-6 col-sm-12 text-center">
                           <div class="empty-cart">
                              <div class="card-body cart">
                                 <div class="col-sm-12 empty-cart-cls text-center">
                                    <i
                                       style={{ fontSize: "100px" }}
                                       class="fas fa-shopping-cart mb-4"
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
            <div className="container mt-5 mb-5 col-lg-12 col-md-6 col-sm-12 text-center">
               {products.length > 0 ? (
                  <StripeCheckout products={products} setReload={setReload} />
               ) : (
                  <p></p>
               )}
            </div>
         </div>
      </div>
   );
};
export default Cart;
