import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getAllCategories, addProduct } from "./helper/adminapicall";
import Base from "../core/Base";
import "../core/css/form-style.css";

const AddProduct = () => {
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

   const preload = () => {
      getAllCategories().then((data) => {
         if (data.error) {
            setValues({ ...values, error: data.error });
         } else {
            setValues({
               ...values,
               categories: data,
               formData: new FormData(),
            });
         }
      });
   };

   useEffect(() => {
      preload();
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
      addProduct(user._id, token, formData).then((data) => {
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
      });
   };
   const successMsg = () => {
      if (success) {
         toast.success("Product added successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
   };
   const errorMsg = () => {
      if (error) {
         toast.error("Failed to add product", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
   };
   const AddProductForm = () => (
      <div className="container mt-5 mb-5">
         <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6">
               <div className="card px-5 py-5">
                  <h5 className="mt-3 text-center">Add Product</h5>
                  <div className="form-input">
                     <input
                        className="form-control"
                        onChange={handleChange("name")}
                        required
                        name="product_image"
                        type="text"
                        placeholder="Enter Product Name"
                        value={name}
                     />
                     <textarea
                        className="form-control"
                        onChange={handleChange("description")}
                        required
                        name="product_image"
                        value={description}
                        type="text-area"
                        placeholder="Enter Product Description"
                     />
                     <input
                        className="form-control"
                        onChange={handleChange("price")}
                        required
                        value={price}
                        type="text"
                        placeholder="Enter Product Price"
                     />

                     <select
                        className="select-control"
                        onChange={handleChange("category")}
                        type="select"
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
                        className="form-control"
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
                  </div>
                  <button
                     className="btn btn-primary mt-4 signup"
                     type="submit"
                     onClick={onSubmit}
                  >
                     Add Product
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
         {successMsg()}
         {errorMsg()}
         {AddProductForm()}
         <ToastContainer />
      </div>
   );
};

export default AddProduct;
