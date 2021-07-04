import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import "../form-style.css";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
   const [values, setValues] = useState({
      email: "admin@apple.com",
      password: "admin123",
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
            console.log("SignIN Failed", error);
         });
   };

   const performRedirect = () => {
      if (didRedirect) {
         if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
         } else {
            return <Redirect to="/user/dashboard" />;
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
               <h2>Loading....</h2>
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
         <div>
            <form className="box">
               <h1>Sign In</h1>
               <input
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
               <input
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
               <button onClick={(event) => onSubmit(event)} type="submit">
                  SignIn
               </button>
            </form>
         </div>
      );
   };
   return (
      <div>
         <Base />
         {SigninForm()}
         {performRedirect()}
         {loadingMsg()}
         {errorMsg()}
      </div>
   );
};

export default Signin;
