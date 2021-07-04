import React from "react";
import { API } from "../../backend";
import "../../styles.css";
const ImageHelper = ({ product }) => {
   const imageURL = product
      ? `${API}/product/image/${product._id}`
      : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`;
   return (
      <div className="p-2">
         <img
            src={imageURL}
            alt="photo"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="img-fluid"
            width="200"
         />
      </div>
   );
};
export default ImageHelper;
