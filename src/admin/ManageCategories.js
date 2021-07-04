import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import "../form-style.css";
const ManageCategories = () => {
   const [categories, setCategories] = useState([]);
   const { user, token } = isAuthenticated();

   const preload = () => {
      getAllCategories().then((data) => {
         console.log(data);
         if (data.error) {
            console.log(data.error);
         } else {
            setCategories(data);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   const deleteThisCategory = (categoryId) => {
      deleteCategory(categoryId, user._id, token).then((data) => {
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
         <h2 className="mb-4">All Categories:</h2>
         <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
         </Link>
         <div className="row">
            <div className="col-12">
               <h2 className="text-center  my-3">
                  Total {categories.length} Categories
               </h2>
               {categories.map((category, index) => {
                  return (
                     <div key={index} className="row text-center mb-2 ">
                        <div className="col-3">
                           <h3 className="text-left">{category.name}</h3>
                        </div>
                        <div className="col-3">
                           <Link
                              className="btn btn-success"
                              to={`/admin/category/update/${category._id}`}
                           >
                              <span className="">Update</span>
                           </Link>
                        </div>
                        <div className="col-3">
                           <button
                              onClick={() => {
                                 deleteThisCategory(category._id);
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

export default ManageCategories;
