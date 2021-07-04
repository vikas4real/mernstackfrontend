import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
const Signup = () => {
   const SignupForm = () => {
      return (
         <div className="row" style={{ zIndex: 10 }}>
            <div className="col-md-6 offset-sm-3 text-left">
               <form>
                  <div className="form-group">
                     <label>Name</label>
                     <input type="text" />
                  </div>
                  <div className="form-group">
                     <label>E-Mail</label>
                     <input type="email" />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" />
                  </div>
                  <button className="btn btn-success btn-block">SignUp</button>
               </form>
            </div>
         </div>
      );
   };
   return <div>{SignupForm()}</div>;
};

export default Signup;
