import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import "../form-style.css";
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
      <form className="box">
         <h1>Update Category</h1>
         <input
            onChange={handleChange}
            required
            value={name}
            type="text"
            placeholder="Enter Category Name"
         />
         <button type="submit" onClick={(event) => onSubmit(event)}>
            Update Category
         </button>
         <Link to="/admin/dashboard">
            <button type="submit">Go Back</button>
         </Link>
      </form>
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
