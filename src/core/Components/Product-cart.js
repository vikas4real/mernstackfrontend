import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { removeItemFromCart } from "../helper/cartHelper";
import "../css/cart-style.css";
import { API } from "src/backend";
const ProductCart = ({
   product,
   addtoCart = true,
   removeFromCart = false,
   reload = undefined,
   setReload = (f) => f,
}) => {
   const [redirect, setRedirect] = useState(false);
   const [count, setCount] = useState(product.count);

   const ProductCartTitle = product ? product.name : "Product Name";
   const ProductCartDescription = product
      ? product.description
      : "Product Derscription";
   const ProductCartPrice = product ? product.price : "0";
   const imageURL = product
      ? `${API}/product/image/${product._id}`
      : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`;
   const getARedirect = (redirect) => {
      if (redirect) {
         return <Redirect to="/cart" />;
      }
   };
   const showRemoveFromCart = (removeFromCart) => {
      return (
         removeFromCart && (
            <button
               className="btn btn-danger"
               onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
               }}
            >
               <i class="fas fa-trash-alt"></i>
            </button>
         )
      );
   };

   return (
      <div class="row">
         <div class="col-md-4">
            {getARedirect(redirect)}

            <img
               src={imageURL}
               alt="photo"
               className="img-fluid mx-auto d-block image"
               width="200"
            />
         </div>
         <div class="col-md-8">
            <div class="info">
               <div class="row">
                  <div class="col-md-5 product-name">
                     <div class="product-name">
                        <h6>{ProductCartTitle}</h6>
                        <div class="product-info">
                           <span>Description: {ProductCartDescription}</span>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-4 price">
                     <span>₹ {ProductCartPrice}</span>
                  </div>
                  <div class="col-md-3">
                     {showRemoveFromCart(removeFromCart)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductCart;
