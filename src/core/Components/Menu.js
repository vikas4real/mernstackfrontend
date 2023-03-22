import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth/helper";
import "../../style.css";

const currentMenu = (history, path) => {
   if (history.location.pathname === path) {
      return { color: "#FFFFFF", textDecoration: "none" };
   } else {
      return { color: "#D1D1D1", textDecoration: "none" };
   }
};
const Menu = ({ history }) => (
   <nav className="navbar navbar-expand-lg navbar-dark">
      <Link
         className="navbar-brand .d-none .d-sm-block .d-md-none"
         style={currentMenu(history, "/")}
         to="/"
      >
         {" "}
         <i className="fab fa-apple"></i>
      </Link>

      <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarNavDropdown"
         aria-controls="navbarNavDropdown"
         aria-expanded="false"
         aria-label="Toggle navigation"
      >
         <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
         <ul
            style={{ margin: "auto", listStyle: "none" }}
            className="navbar-nav"
         >
            <li className="nav-item active">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/")}
                  to="/"
               >
                  <i className="fab fa-apple"></i>
               </Link>
            </li>
            <li className="nav-item active">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/mac")}
                  to="/mac"
               >
                  Mac
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/iphone")}
                  to="/iphone"
               >
                  iPhone
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/ipad")}
                  to="/ipad"
               >
                  iPad
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/watch")}
                  to="/watch"
               >
                  Watch
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/accessories")}
                  to="/accessories"
               >
                  Accessories
               </Link>
            </li>
            <li className="nav-item">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/cart")}
                  to="/cart"
               >
                  <i className="fal fa-shopping-bag"></i>
               </Link>
            </li>
            <li className="nav-item dropdown">
               <Link
                  style={currentMenu(history, "#")}
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
               >
                  Account
               </Link>

               <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
               >
                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                     <Link
                        className="nav-link"
                        style={currentMenu(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                     >
                        Admin Dashboard
                     </Link>
                  )}
                  {isAuthenticated() && isAuthenticated().user.role === 0 && (
                     <Link
                        className="nav-link"
                        style={currentMenu(history, "/user/dashboard")}
                        to="/user/dashboard"
                     >
                        User Dashboard
                     </Link>
                  )}
                  {!isAuthenticated() && (
                     <Fragment>
                        <Link
                           className="nav-link"
                           style={currentMenu(history, "/signup")}
                           to="/signup"
                        >
                           Sign Up
                        </Link>

                        <Link
                           className="nav-link"
                           style={currentMenu(history, "/signin")}
                           to="/signin"
                        >
                           Sign In
                        </Link>
                     </Fragment>
                  )}
                  {isAuthenticated() && (
                     <span
                        style={{ color: "#f1f1f1" }}
                        onClick={() => {
                           signout(() => {
                              history.push("/");
                           });
                        }}
                     >
                        Sign Out
                     </span>
                  )}
               </div>
            </li>
         </ul>
      </div>
   </nav>
);

export default withRouter(Menu);
