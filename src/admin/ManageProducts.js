import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import "../form-style.css";
const ManageProducts = () => {
   const [products, setProducts] = useState([]);
   const { user, token } = isAuthenticated();

   const preload = () => {
      getAllProducts().then((data) => {
         //console.log(data);
         if (data.error) {
            console.log(data.error);
         } else {
            setProducts(data.products);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   const deleteThisProduct = (productId) => {
      deleteProduct(productId, user._id, token).then((data) => {
         console.log(data);
         if (data.error) {
            console.log(data.error);
         } else {
            preload();
         }
      });
   };

   return (
      <div>
         <Base></Base>
         <h2 className="mb-4">All products:</h2>
         <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
         </Link>
         <div className="row">
            <div className="col-12">
               <h2 className="text-center  my-3">
                  Total {products.length} products
               </h2>
               {products.map((product, index) => {
                  return (
                     <div key={index} className="row text-center mb-2 ">
                        <div className="col-3">
                           <img alt="10px 10px" />
                        </div>
                        <div className="col-3">
                           <h3 className="text-left">{product.name}</h3>
                        </div>
                        <div className="col-3">
                           <Link
                              className="btn btn-success"
                              to={`/admin/product/update/${product._id}`}
                           >
                              <span className="">Update</span>
                           </Link>
                        </div>
                        <div className="col-3">
                           <button
                              onClick={() => {
                                 deleteThisProduct(product._id);
                              }}
                              className="btn btn-danger"
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default ManageProducts;
