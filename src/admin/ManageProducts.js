import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
const ManageProducts = () => {
   const [products, setProducts] = useState([]);
   const { user, token } = isAuthenticated();

   const preload = () => {
      getAllProducts().then((data) => {
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
         <h2 className="mb-4 text-center">:: All products ::</h2>
         <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Go back to Admin Dashboard</span>
         </Link>
         <div className="row text-center">
            <div className="col-12 mt-5">
               {products.map((product, index) => {
                  return (
                     <div key={index} className="row text">
                        <div className="col-1">
                           <h3>{index + 1}-</h3>
                        </div>
                        <div className="col-7">
                           <h3 className="text-left">{product.name}</h3>
                        </div>
                        <div className="col-2">
                           <Link
                              className="btn btn-success"
                              to={`/admin/product/update/${product._id}`}
                           >
                              <span className="">Update</span>
                           </Link>
                        </div>
                        <div className="col-2">
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
