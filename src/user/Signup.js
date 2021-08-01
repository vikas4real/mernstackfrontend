import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import "../core/css/form-style.css";
const Signup = () => {
   const [values, setValues] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      error: false,
      success: false,
   });
   const { fname, lname, email, password, error, success } = values;
   const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ fname, lname, email, password })
         .then((data) => {
            if (data.error) {
               setValues({ ...values, error: data.error, success: false });
            } else {
               setValues({
                  ...values,
                  fname: "",
                  lname: "",
                  email: "",
                  password: "",
                  error: "",
                  success: true,
               });
            }
         })
         .catch(console.log("Error in Signup", error));
   };

   const successMsg = () => {
      return (
         <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
         >
            Signed UP Successfully. Please <Link to="/signin">Login Here</Link>
         </div>
      );
   };

   const errorMsg = () => {
      return (
         <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
         >
            {error}
         </div>
      );
   };
   const SignupForm = () => {
      return (
         <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
               <div className="col-md-6">
                  <div className="card px-5 py-5">
                     <h5 className="mt-3 text-center">Sign Up</h5>
                     <div className="form-input">
                        <i className="fa fa-user"></i>
                        <input
                           className="form-control"
                           onChange={(event) => {
                              setValues({
                                 ...values,
                                 fname: event.target.value,
                              });
                           }}
                           required
                           type="text"
                           value={fname}
                           placeholder="Enter First Name"
                        />
                     </div>
                     <div className="form-input">
                        <i className="fa fa-user"></i>
                        <input
                           className="form-control"
                           onChange={(event) => {
                              setValues({
                                 ...values,
                                 lname: event.target.value,
                              });
                           }}
                           type="text"
                           value={lname}
                           placeholder="Enter Last Name"
                        />
                     </div>
                     <div className="form-input">
                        <i className="fa fa-envelope"></i>
                        <input
                           className="form-control"
                           onChange={(event) => {
                              setValues({
                                 ...values,
                                 email: event.target.value,
                              });
                           }}
                           required
                           type="text"
                           value={email}
                           placeholder="E-Mail"
                        />
                     </div>
                     <div className="form-input">
                        <i className="fa fa-lock"></i>
                        <input
                           className="form-control"
                           onChange={(event) => {
                              setValues({
                                 ...values,
                                 password: event.target.value,
                              });
                           }}
                           required
                           type="password"
                           value={password}
                           placeholder="Password"
                        />
                     </div>
                     <button
                        className="btn btn-primary mt-4 signup"
                        onClick={(event) => onSubmit(event)}
                        type="submit"
                     >
                        SignUp
                     </button>
                     <div class="text-center mt-3">
                        <span>Or continue with these social profile</span>
                     </div>
                     <div class="d-flex justify-content-center mt-4">
                        <span class="social">
                           <i className="fab fa-google"></i>
                        </span>
                        <span class="social">
                           <i class="fab fa-facebook"></i>
                        </span>
                     </div>
                     <div className="text-center mt-4">
                        <span>Already a user? </span>
                        <Link className="text-decoration-none" to="./signin">
                           Sign In
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   };
   return (
      <div>
         <Base />
         {SignupForm()}
         {successMsg()}
         {errorMsg()}
      </div>
   );
};

export default Signup;
