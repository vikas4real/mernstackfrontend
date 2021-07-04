import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentMenu = (history, path) => {
   if (history.location.pathname === path) {
      return { color: "#FFFFFF" };
   } else {
      return { color: "#D1D1D1" };
   }
};
const Menu = ({ history }) => (
   <div>
      <ul className="nav nav-tabs bg-dark">
         <li className="nav-item">
            <Link style={currentMenu(history, "/")} className="nav-link" to="/">
               Home
            </Link>
         </li>
         <li className="nav-item">
            <Link
               style={currentMenu(history, "/mac")}
               className="nav-link"
               to="/mac"
            >
               Mac
            </Link>
         </li>
         <li className="nav-item">
            <Link
               style={currentMenu(history, "/ipad")}
               className="nav-link"
               to="/ipad"
            >
               iPad
            </Link>
         </li>
         <li className="nav-item">
            <Link
               style={currentMenu(history, "/iphone")}
               className="nav-link"
               to="/iphone"
            >
               iPhone
            </Link>
         </li>
         <li className="nav-item">
            <Link
               style={currentMenu(history, "/watch")}
               className="nav-link"
               to="/watch"
            >
               Watch
            </Link>
         </li>
         <li className="nav-item">
            <Link
               style={currentMenu(history, "/accessories")}
               className="nav-link"
               to="/accessories"
            >
               Accessories
            </Link>
         </li>
         {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
               <Link
                  style={currentMenu(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
               >
                  Admin Dashboard
               </Link>
            </li>
         )}
         {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
               <Link
                  style={currentMenu(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
               >
                  User Dashboard
               </Link>
            </li>
         )}
         <li className="nav-item">
            <Link
               style={currentMenu(history, "/cart")}
               className="nav-link"
               to="/cart"
            >
               Cart
            </Link>
         </li>
         !
         {!isAuthenticated() && (
            <Fragment>
               <li className="nav-item">
                  <Link
                     style={currentMenu(history, "/signup")}
                     className="nav-link"
                     to="/signup"
                  >
                     SignUp
                  </Link>
               </li>
               <li className="nav-item">
                  <Link
                     style={currentMenu(history, "/signin")}
                     className="nav-link"
                     to="/signin"
                  >
                     SignIn
                  </Link>
               </li>
            </Fragment>
         )}
         {isAuthenticated() && (
            <li className="nav-item">
               <span
                  className="nav-link text-warning"
                  onClick={() => {
                     signout(() => {
                        history.push("/");
                     });
                  }}
               >
                  Sign Out
               </span>
            </li>
         )}
      </ul>
   </div>
);

export default withRouter(Menu);
