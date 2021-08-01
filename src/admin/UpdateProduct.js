import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import {
   getAllCategories,
   updateProduct,
   getProduct,
} from "./helper/adminapicall";
import Base from "../core/Base";
import "../form-style.css";

const UpdateProduct = ({ match }) => {
   const { user, token } = isAuthenticated();
   const [values, setValues] = useState({
      name: "",
      price: "",
      description: "",
      stock: "",
      product_image: "",
      categories: [],
      category: "",
      success: false,
      error: "",
      createdProduct: "",
      getaRedirect: false,
      formData: "",
   });
   const {
      name,
      description,
      price,
      categories,
      category,
      stock,
      product_image,
      createdProduct,
      getaRedirect,
      formData,
      success,
      error,
   } = values;

   const preloadCategories = () => {
      getAllCategories().then((data) => {
         if (data.error) {
            setValues({ ...values, error: data.error });
         } else {
            setValues({ categories: data, formData: new FormData() });
         }
      });
   };

   const preload = (productId) => {
      getProduct(productId).then((data) => {
         if (data.error) {
            setValues({ ...values, error: data.error });
         } else {
            preloadCategories();
            setValues({
               ...values,
               name: data.name,
               description: data.description,
               price: data.price,
               category: data.category._id,
               stock: data.stock,
               formData: new FormData(),
            });
         }
      });
   };

   useEffect(() => {
      preload(match.params.productId);
   }, []);

   const handleChange = (name) => (event) => {
      const value =
         name === "product_image" ? event.target.files[0] : event.target.value;
      console.log(event.target.value);
      formData.set(name, value);
      setValues({ ...values, [name]: value });
   };

   const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: "", success: true });
      //backend request fired
      updateProduct(match.params.productId, user._id, token, formData).then(
         (data) => {
            if (data?.error) {
               setValues({ ...values, error: data.error });
            } else {
               setValues({
                  ...values,
                  name: "",
                  price: "",
                  description: "",
                  product_image: "",
                  stock: "",
                  success: false,
                  createdProduct: data?.name,
               });
            }
         }
      );
   };

   const successMsg = () => {
      return (
         <div
            className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}
         >
            {createdProduct} Updated Successfully
         </div>
      );
   };
   const errorMsg = () => {
      return (
         <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
         >
            Failed to Add Product
         </div>
      );
   };

   const UpdateProductForm = () => (
      <form className="box">
         <h1>Add Product</h1>
         <input
            onChange={handleChange("name")}
            required
            name="product_image"
            type="text"
            placeholder="Enter Product Name"
            value={name}
         />
         <textarea
            onChange={handleChange("description")}
            required
            name="product_image"
            value={description}
            type="text-area"
            placeholder="Enter Product Description"
         />
         <input
            onChange={handleChange("price")}
            required
            value={price}
            type="text"
            placeholder="Enter Product Price"
         />

         <select
            onChange={handleChange("category")}
            type="select"
            placeholder="Category"
         >
            <option>Select Category</option>
            {categories &&
               categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                     {cat.name}
                  </option>
               ))}
         </select>
         <input
            onChange={handleChange("stock")}
            required
            value={stock}
            type="number"
            placeholder="Stock"
         />
         <input
            onChange={handleChange("product_image")}
            className="text-white"
            type="file"
            name="product_image"
            accept="image"
            placeholder="Choose a file"
         />
         <button type="submit" onClick={onSubmit}>
            Update Product
         </button>
         <Link to="/admin/dashboard">
            <button type="submit">Go Back</button>
         </Link>
      </form>
   );

   return (
      <div>
         <Base></Base>
         {successMsg()}
         {errorMsg()}
         {UpdateProductForm()}
      </div>
   );
};

export default UpdateProduct;
