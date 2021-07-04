import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import "../form-style.css";
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
         <div>
            <form className="box">
               <h1>Sign Up</h1>
               <input
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
               <input
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
               <input
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
               <input
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
               <button onClick={(event) => onSubmit(event)} type="submit">
                  SignUp
               </button>
            </form>
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
