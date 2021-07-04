import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

const Signin = () => {
   const SigninForm = () => {
      return (
         <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
               <form>
                  <div className="form-group">
                     <label>E-Mail</label>
                     <input type="email" />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" />
                  </div>
                  <button className="btn btn-success btn-block">SignIn</button>
               </form>
            </div>
         </div>
      );
   };
   return <Base>{SigninForm()}</Base>;
};

export default Signin;
