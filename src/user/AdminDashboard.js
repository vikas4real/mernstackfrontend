import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashboard = () => {
   const {
      user: { fname, email },
   } = isAuthenticated();

   const adminLeftSide = () => {
      return (
         <ul className="list-group" style={{ borderRadius: "0" }}>
            <li className="list-group-item">
               <Link to="/admin/category/create" className="nav-link text-dark">
                  Add Category
               </Link>
            </li>
            <li className="list-group-item">
               <Link to="/admin/categories" className="nav-link text-dark">
                  Manage Categories
               </Link>
            </li>
            <li className="list-group-item">
               <Link to="/admin/product/create" className="nav-link text-dark">
                  Add Product
               </Link>
            </li>
            <li className="list-group-item">
               <Link to="/admin/products" className="nav-link text-dark">
                  Manage Products
               </Link>
            </li>
            <li className="list-group-item">
               <Link to="/admin/orders" className="nav-link text-dark">
                  Manage Orders
               </Link>
            </li>
         </ul>
      );
   };

   const adminRightSide = () => {
      return (
         <ul className="list-group" style={{ borderRadius: "0" }}>
            <li className="list-group-item">
               <span>Name: </span>
               {fname}
            </li>
            <li className="list-group-item">
               <span>E-Mail: </span>
               {email}
            </li>
         </ul>
      );
   };

   return (
      <div>
         <Base />
         <div className="row">
            <div className="col-3 p-0">{adminLeftSide()}</div>
            <div className="col-9 p-0">{adminRightSide()}</div>
         </div>
      </div>
   );
};
export default AdminDashboard;
