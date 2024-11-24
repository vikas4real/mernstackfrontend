import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart } from "../core/helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({ products, finalPrice }) => {
   const [data, setData] = useState({
      loading: false,
      success: false,
      error: "",
      address: "",
   });

   const makePayment = (token) => {
      let tokenData = localStorage.getItem("jwt");
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
            const status = response.status;
            emptyCart();
            window.location.reload();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const showStripeButton = () => {
      return isAuthenticated() ? (
         <StripeCheckoutButton
            stripeKey={process.env.REACT_APP_PAYMENT_PUBLISHABLE_KEY}
            token={makePayment}
            amount={finalPrice * 100}
            name="Apple Store"
            shippingAddress
            billingAddress
         >
            <button className="btn btn-success">Pay with Stripe</button>
         </StripeCheckoutButton>
      ) : (
         <Link to="/signin">
            <button className="btn btn-danger">Sign In to Make Order</button>
         </Link>
      );
   };

   return (
      <div>
         <h4>Total amount to be paid</h4>
         <h2>₹ {finalPrice}</h2>
         {showStripeButton()}
      </div>
   );
};
export default StripeCheckout;
