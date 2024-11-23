import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { API } from "../../backend"; // Adjust the path based on your project structure
import { addProducToCart, removeItemFromCart } from "../helper/cartHelper"; // Ensure these helpers exist and are correctly imported

const Card = ({
   product,
   addtoCart = true,
   removeFromCart = false,
   reload = undefined,
   setReload = (f) => f,
}) => {
   const [redirect, setRedirect] = useState(false);

   const cardTitle = product ? product.name : "Product Name";
   const cardDescription = product
      ? product.description
      : "Product Description";
   const cardPrice = product ? product.price : "0";
   const imageURL = product
      ? `${API}/product/image/${product._id}`
      : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`;

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
            <button
               className="btn btn-success"
               onClick={addToCart}
               style={{ margin: "5px" }}
            >
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
                  setReload(!reload); // Trigger reload to update UI
               }}
               style={{ margin: "5px" }}
            >
               Remove from Cart
            </button>
         )
      );
   };

   return (
      <div
         className="card"
         style={{
            margin: "5px",
            padding: "10px",
            maxWidth: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            backgroundColor: "#fff",
         }}
      >
         {getARedirect(redirect)}
         <img
            src={imageURL}
            alt="Product"
            style={{
               width: "100%",
               height: "200px",
               objectFit: "contain",
               borderRadius: "8px", // Optional: Adds rounded corners for the image
            }}
         />
         <div className="card-body" style={{ textAlign: "center" }}>
            <h5
               className="card-title"
               style={{ fontWeight: "bold", margin: "10px 0" }}
            >
               {cardTitle}
            </h5>
            <p
               className="price"
               style={{ fontSize: "18px", color: "grey", margin: "10px 0" }}
            >
               ₹ {cardPrice}
            </p>
            <p
               style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}
            >
               {cardDescription}
            </p>
            <div>
               {showAddToCart(addtoCart)}
               {showRemoveFromCart(removeFromCart)}
            </div>
         </div>
      </div>
   );
};

export default Card;
