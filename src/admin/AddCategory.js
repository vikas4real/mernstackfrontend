import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import "../form-style.css";
import { addCategory } from "./helper/adminapicall";

const AddCategory = () => {
   const [name, setName] = useState("");
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);

   const { user, token } = isAuthenticated();

   const handleChange = (event) => {
      setError("");
      setName(event.target.value);
   };

   const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSuccess(false);

      //backend request fired
      addCategory(user._id, token, { name }).then((data) => {
         if (data.error) {
            setError(true);
         } else {
            setError("");
            setSuccess(true);
            setName("");
         }
      });
   };

   const successMsg = () => {
      if (success) {
         return (
            <div
               className="alert alert-success"
               style={{ display: success ? "" : "none" }}
            >
               Category Added Successfully
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
               Failed to create Category
            </div>
         );
      }
   };

   const AddCategoryForm = () => (
      <form className="box">
         <h1>Create Category</h1>
         <input
            onChange={handleChange}
            required
            value={name}
            type="text"
            placeholder="Enter Category Name"
         />
         <button type="submit" onClick={(event) => onSubmit(event)}>
            Add Category
         </button>
         <Link to="/admin/dashboard">
            <button type="submit">Go Back</button>
         </Link>
      </form>
   );

   return (
      <div>
         <Base></Base>
         {AddCategoryForm()}
         {successMsg()}
         {errorMsg()}
      </div>
   );
};
export default AddCategory;
