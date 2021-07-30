import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "../styles.css";

const currentMenu = (history, path) => {
   if (history.location.pathname === path) {
      return { color: "#FFFFFF", textDecoration: "none" };
   } else {
      return { color: "#D1D1D1", textDecoration: "none" };
   }
};
const Menu = ({ history }) => (
   <nav>
      <ul>
         <li>
            <Link style={currentMenu(history, "/")} to="/">
               <i className="fab fa-apple"></i>
            </Link>
         </li>
         <li>
            <Link style={currentMenu(history, "/mac")} to="/mac">
               Mac
            </Link>
         </li>
         <li>
            <Link style={currentMenu(history, "/ipad")} to="/ipad">
               iPad
            </Link>
         </li>
         <li>
            <Link style={currentMenu(history, "/iphone")} to="/iphone">
               iPhone
            </Link>
         </li>
         <li>
            <Link style={currentMenu(history, "/watch")} to="/watch">
               Watch
            </Link>
         </li>
         <li>
            <Link
               style={currentMenu(history, "/accessories")}
               to="/accessories"
            >
               Accessories
            </Link>
         </li>
         {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li>
               <Link
                  style={currentMenu(history, "/admin/dashboard")}
                  to="/admin/dashboard"
               >
                  Admin Dashboard
               </Link>
            </li>
         )}
         {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li>
               <Link
                  style={currentMenu(history, "/user/dashboard")}
                  to="/user/dashboard"
               >
                  User Dashboard
               </Link>
            </li>
         )}
         <li>
            <Link style={currentMenu(history, "/cart")} to="/cart">
               <i class="fas fa-shopping-bag"></i>
            </Link>
         </li>
         {!isAuthenticated() && (
            <Fragment>
               <li>
                  <Link style={currentMenu(history, "/signup")} to="/signup">
                     SignUp
                  </Link>
               </li>
               <li>
                  <Link style={currentMenu(history, "/signin")} to="/signin">
                     SignIn
                  </Link>
               </li>
            </Fragment>
         )}
         {isAuthenticated() && (
            <li>
               <span
                  style={{ color: "red" }}
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
   </nav>
);

export default withRouter(Menu);
