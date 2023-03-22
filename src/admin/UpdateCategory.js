import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import "../core/css/form-style.css"
import { updateCategory, getCategoryById } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
   const [name, setName] = useState("");
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);

   const { user, token } = isAuthenticated();

   const preload = () => {
      getCategoryById(match.params.categoryId).then((data) => {
         if (data.error) {
            setName("");
         } else {
            setName(data.name);
         }
      });
   };
   useEffect(() => {
      preload();
   }, []);

   const handleChange = (event) => {
      setError("");
      setName(event.target.value);
   };

   const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSuccess(false);
      //backend request fired
      updateCategory(match.params.categoryId, user._id, token, { name }).then(
         (data) => {
            if (data.error) {
               setError(true);
            } else {
               setError("");
               setSuccess(true);
               setName("");
            }
         }
      );
   };

   const successMsg = () => {
      if (success) {
         return (
            <div
               className="alert alert-success"
               style={{ display: success ? "" : "none" }}
            >
               Category Updated Successfully
            </div>
         );
      }
   };
   const errorMsg = () => {
      if (error) {
         return (
            <div
               className="alert alert-danger"
               style={{ display: error ? "" : "none" }}
            >
               Failed to update Category
            </div>
         );
      }
   };

   const UpdateCategoryForm = () => (
      <div className="container mt-5 mb-5">
         <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6">
               <div className="card px-5 py-5">
                  <h5 className="mt-3 text-center">Update Category</h5>
                  <div className="form-input">
                     <input
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={name}
                        type="text"
                        placeholder="Enter New Category Name"
                     />
                  </div>

                  <button
                     className="btn btn-primary mt-4 signup"
                     type="submit"
                     onClick={(event) => onSubmit(event)}
                  >
                     Update Category
                  </button>

                  <Link
                     className="btn btn-danger mt-4 signup"
                     to="/admin/dashboard"
                  >
                     <button className="btn" type="submit">
                        Go Back
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <div>
         <Base></Base>
         {UpdateCategoryForm()}
         {successMsg()}
         {errorMsg()}
      </div>
   );
};
export default UpdateCategory;
