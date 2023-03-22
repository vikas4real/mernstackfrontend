import React from "react";
import { API } from "../../backend";
import "../css/cart-style.css";
const ImageHelper = ({ product }) => {
   const imageURL = product
      ? `${API}/product/image/${product._id}`
      : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`;
   return (
      <div className="shopping-cart">
         <img
            src={imageURL}
            alt="photo"
            className="img-fluid mx-auto d-block image"
            width="200"
         />
      </div>
   );
};
export default ImageHelper;
