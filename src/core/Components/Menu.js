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
         className="navbar-brand d-block d-md-none"
         style={{
            ...currentMenu(history, "/"), // Spread the styles from currentMenu
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "24px",
         }}
         to="/"
      >
         <i className="fab fa-apple"></i>
      </Link>

      <button
         className="navbar-toggler"
         type="button"
         data-bs-toggle="collapse"
         data-bs-target="#navbarNavDropdown"
         aria-controls="navbarNavDropdown"
         aria-expanded="false"
         aria-label="Toggle navigation"
      >
         <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
         <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
               <Link
                  className="nav-link"
                  style={currentMenu(history, "/")}
                  to="/"
               >
                  <i className="fab fa-apple"></i>
               </Link>
            </li>
            <li className="nav-item">
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
                  <i className="fas fa-shopping-bag"></i>
               </Link>
            </li>
            <li className="nav-item dropdown">
               <Link
                  className="nav-link dropdown-toggle"
                  style={currentMenu(history, "#")}
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
               >
                  Account
               </Link>
               <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{
                     backgroundColor: "#333", // Dark background
                     border: "none", // Remove border
                  }}
               >
                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                     <Link
                        className="dropdown-item"
                        style={currentMenu(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                     >
                        Admin Dashboard
                     </Link>
                  )}
                  {isAuthenticated() && isAuthenticated().user.role === 0 && (
                     <Link
                        className="dropdown-item"
                        style={currentMenu(history, "/user/dashboard")}
                        to="/user/dashboard"
                     >
                        User Dashboard
                     </Link>
                  )}
                  {!isAuthenticated() && (
                     <Fragment>
                        <Link
                           className="dropdown-item"
                           style={{
                              color: "#d1d1d1",
                              textDecoration: "none",
                           }}
                           to="/signup"
                        >
                           Sign Up
                        </Link>
                        <Link
                           className="dropdown-item"
                           style={{
                              color: "#d1d1d1",
                              textDecoration: "none",
                           }}
                           to="/signin"
                        >
                           Sign In
                        </Link>
                     </Fragment>
                  )}
                  {isAuthenticated() && (
                     <span
                        className="dropdown-item"
                        style={{
                           cursor: "pointer",
                           color: "#d1d1d1",
                           textDecoration: "none",
                        }}
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
