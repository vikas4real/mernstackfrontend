import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCart, emptyCart } from "../core/helper/cartHelper";
import { createOrder } from "../core/helper/orderHelper";
import { getTheToken, processThePayment } from "./braintreeHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BraintreeCheckout = (
   products,
   setReload = (f) => f,
   reload = undefined
) => {
   const [info, setInfo] = useState({
      loading: false,
      success: false,
      error: false,
      clientToken: null,
   });
   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;

   const getToken = (userId, token) => {
      getTheToken(userId, token).then((response) => {
         console.log("INFORMATION", response);
         if (response.error) {
            setInfo({ ...info, error: response.error });
         } else {
            const clientToken = response.clientToken;
            setInfo({ clientToken });
         }
      });
   };

   useEffect(() => {
      getToken(userId, token);
   }, []);

   const showBraintreeButton = () => {
      return isAuthenticated() ? (
         <BraintreeCheckout>
            <button className="btn btn-success">Pay with BrainTree</button>
         </BraintreeCheckout>
      ) : (
         <Link to="/signin">
            <button className="btn btn-danger">SignIn to Make Order</button>
         </Link>
      );
   };

   return <div>{showBraintreeButton()}</div>;
};
export default BraintreeCheckout;
