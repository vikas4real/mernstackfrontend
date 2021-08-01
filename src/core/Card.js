import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addProducToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/imageHelper";
import "../core/css/card-style.css";

const Card = ({
   product,
   addtoCart = true,
   removeFromCart = false,
   reload = undefined,
   setReload = (f) => f,
}) => {
   const [redirect, setRedirect] = useState(false);
   const [count, setCount] = useState(product.count);

   const cardTitle = product ? product.name : "Product Name";
   const cardDescription = product
      ? product.description
      : "Product Derscription";
   const cardPrice = product ? product.price : "0";

   const getARedirect = (redirect) => {
      if (redirect) {
         return <Redirect to="/cart" />;
      }
   };

   const addToCart = () => {
      addProducToCart(product, () => setRedirect(true));
   };

   const showAddToCart = (addtoCart) => {
      return (
         addtoCart && (
            <button className="btn btn-success" onClick={addToCart}>
               Add to Cart
            </button>
         )
      );
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
               Remove from cart
            </button>
         )
      );
   };

   return (
      <div className="product-card p-2">
         <div className="text-center">
            {getARedirect(redirect)}
            <ImageHelper product={product} />
         </div>
         <div className="content">
            <div
               className="
                     d-flex
                     justify-content-between
                     align-items-center
                  "
            >
               <span className="category">{cardTitle}</span>
               <span className="price">₹ {cardPrice}</span>
            </div>
            <p> {cardDescription}</p>
            <div className="buttons d-flex justify-content-center">
               {showAddToCart(addtoCart)}
               {showRemoveFromCart(removeFromCart)}
            </div>
         </div>
      </div>
   );
};
export default Card;
/*
<------- Old Card Style ------->

<div className="card text-white bg-dark border border-info ">
         <div className="card-header lead">{cardTitle}</div>
         <div className="card-body">
            {getARedirect(redirect)}
            <ImageHelper product={product} />
            <p className="lead bg-success font-weight-normal text-wrap">
               {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">
               Price : ₹ {cardPrice}
            </p>
            <div className="row">
               <div className="col-12">{showAddToCart(addtoCart)}</div>
               <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
               </div>
            </div>
         </div>
      </div>
*/
