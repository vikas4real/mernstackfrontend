import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import "../core/css/form-style.css";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
   const [values, setValues] = useState({
      email: "",
      password: "",
      error: false,
      loading: false,
      didRedirect: "",
   });

   const { email, password, error, loading, didRedirect } = values;
   const { user } = isAuthenticated();

   const onSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, error: false, loading: true });
      signin({ email, password })
         .then((data) => {
            if (data.error) {
               setValues({ ...values, error: data.error, loading: false });
            } else {
               authenticate(data, () => {
                  setValues({ ...values, didRedirect: true });
               });
            }
         })
         .catch((error) => {
            console.log("SignIn Failed", error);
         });
   };

   const performRedirect = () => {
      if (didRedirect) {
         if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
         } else {
            return <Redirect to="/" />;
         }
      }
      if (isAuthenticated()) {
         return <Redirect to="/" />;
      }
   };

   const loadingMsg = () => {
      return (
         loading && (
            <div className="alert alert-info">
               <h2>Signing in....</h2>
            </div>
         )
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

   const SigninForm = () => {
      return (
         <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
               <div className="col-md-6">
                  <div className="card px-5 py-5">
                     <h5 className="mt-3 text-center">Sign In</h5>
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
                           value={email}
                           type="text"
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
                           value={password}
                           type="password"
                           placeholder="Password"
                        />
                     </div>
                     <button
                        className="btn btn-primary mt-4 signup"
                        onClick={(event) => onSubmit(event)}
                        type="submit"
                     >
                        Sign In
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
                        <span>New user? </span>
                        <Link className="text-decoration-none" to="./signup">
                           Sign Up
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
         {errorMsg()}
         {SigninForm()}
         {performRedirect()}
         {loadingMsg()}
      </div>
   );
};

export default Signin;
