import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashboard = () => {
   const {
      user: { fname, lname, email },
   } = isAuthenticated();
   const userLeftSide = () => {
      return (
         <div>
            <ul className="list-group">
               <li className="list-group-item">
                  <Link to="/user/orders" className="nav-link text-dark">
                     Your Orders
                  </Link>
               </li>
            </ul>
         </div>
      );
   };

   const userRightSide = () => {
      return (
         <div className="mb-4">
            <ul className="list-group">
               <li className="list-group-item">
                  <span>Name: {fname + " " + lname}</span>
               </li>
               <li className="list-group-item">
                  <span>E-Mail: </span>
                  {email}
               </li>
            </ul>
         </div>
      );
   };

   return (
      <div>
         <Base></Base>
         <div className="row">
            <div className="container col-3">{userLeftSide()}</div>
            <div className="container col-9">{userRightSide()}</div>
         </div>
      </div>
   );
};
export default UserDashboard;

// <li className="list-group-item">
//                   <Link to="/user/profile" className="nav-link text-dark">
//                      Update Profile
//                   </Link>
//                </li>
