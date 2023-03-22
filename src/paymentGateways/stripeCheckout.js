import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "../core/helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
   products,
   setReload = (f) => f,
   reload = undefined,
}) => {
   const [data, setData] = useState({
      loading: false,
      success: false,
      error: "",
      address: "",
   });

   const token = isAuthenticated() && isAuthenticated().token;
   const userId = isAuthenticated() && isAuthenticated().user._id;

   // <--------- Get Total Price of Products ------------->

   const getFinalPrice = () => {
      let finalprice = 0;
      products.map((p) => {
         finalprice = finalprice + p.price;
      });
      return finalprice;
   };

   // <----------- Make Payment Function -------------->
   const makePayment = (token) => {
      let tokenData = localStorage.getItem("jwt");
      console.log("TOKEN DATA:", tokenData);
      if (!tokenData) {
         return;
      }
      tokenData = JSON.parse(tokenData);
      const body = {
         token,
         products,
         userId: tokenData.user._id,
      };
      return fetch(`${API}/stripepayment`, {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      })
         .then((response) => {
            console.log(response);
            //call for further functions
            const status = response.status;
            console.log("STATUS: ", status);
            emptyCart();
            window.location.reload();
         })
         .catch((err) => {
            console.log(err);
         });
   };
   //<------Empty cart after successfull payment ---->

   // <----------- Show Stripe Payment Button ---------->

   const showStripeButton = () => {
      return isAuthenticated() ? (
         <StripeCheckoutButton
            stripeKey={process.env.REACT_APP_PAYMENT_PUBLISHABLE_KEY}
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="Apple Store"
            shippingAddress
            billingAddress
         >
            <button className="btn btn-success">Pay with Stripe</button>
         </StripeCheckoutButton>
      ) : (
         <Link to="/signin">
            <button className="btn btn-danger">SignIn to Make Order</button>
         </Link>
      );
   };

   return (
      <div>
         <h2>Total Amount to be paid : ₹ {getFinalPrice()}</h2>
         {showStripeButton()}
      </div>
   );
};
export default StripeCheckout;
