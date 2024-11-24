import React, { useState } from "react";
import { Redirect } from "react-router";
import { addProductToCart, removeItemFromCart } from "../helper/cartHelper";
import "../css/cart-style.css";
import { API } from "src/backend";
const ProductCart = ({ product }) => {
   const [redirect, setRedirect] = useState(false);

   const ProductCartTitle = product ? product.name : "Product Name";
   const ProductCartPrice = product ? product.price * product.count : "0";
   const imageURL = product
      ? `${API}/product/image/${product._id}`
      : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`;
   const handleDecrease = () => {
      if (product.count > 1) {
         removeItemFromCart();
         getARedirect();
      }
   };

   const handleIncrease = () => {
      addProductToCart();
      getARedirect();
   };
   const getARedirect = (redirect) => {
      if (redirect) {
         return <Redirect to="/cart" />;
      }
   };

   return (
      <div
         style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "15px",
            backgroundColor: "#f9f9f9",
            alignSelf: "center",
         }}
      >
         {getARedirect(redirect)}
         <img
            src={imageURL} // Replace with actual image URL
            alt="Product"
            style={{
               width: "100px",
               height: "100px",
               objectFit: "contain",
               borderRadius: "8px",
               marginRight: "15px",
            }}
         />
         <div style={{ flex: 1 }}>
            <h3
               style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "0",
                  color: "#333",
               }}
            >
               {ProductCartTitle}
            </h3>
         </div>
         <div
            style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               margin: "5px 0",
            }}
         >
            <button
               onClick={() => handleDecrease()}
               style={{
                  backgroundColor: "#ddd",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  fontSize: "18px",
                  marginRight: "10px",
                  borderRadius: "5px",
               }}
            >
               -
            </button>
            <p
               style={{
                  fontSize: "16px",
                  color: "grey",
                  margin: "0 10px",
                  fontWeight: "bold",
               }}
            >
               {product.count}
            </p>
            <button
               onClick={() => handleIncrease()}
               style={{
                  backgroundColor: "#ddd",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  fontSize: "18px",
                  margin: "10px",
                  borderRadius: "5px",
               }}
            >
               +
            </button>
         </div>
         <div style={{ flex: 1 }}>
            <h3
               style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "0",
                  color: "#333",
               }}
            >
               {ProductCartPrice}
            </h3>
         </div>
      </div>
   );
};

export default ProductCart;
