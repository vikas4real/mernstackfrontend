import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllUserOrders } from "./helper/userapicalls";
import moment from "moment";
import "../core/css/order-style.css";
const Orders = () => {
   const [orders, setOrders] = useState([]);
   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;
   const preload = () => {
      getAllUserOrders(userId, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            console.log(data);
            setOrders(data);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   return (
      <div>
         <Base />
         <div className="row">
            <div className="col-12">
               <h2 className="text-center  my-3">All Orders</h2>

               {orders.map((order, index) => {
                  return (
                     <div key={index} class="order-card">
                        <div class="title">Order Details</div>
                        <div class="info">
                           <div class="row">
                              <div class="col-7">
                                 <span id="heading">Date</span>
                                 <br />
                                 <span id="details">
                                    {moment(order.updatedAt).format("L")}
                                 </span>
                              </div>
                              <div class="col-5 pull-right">
                                 <span id="heading">Order No.</span>
                                 <br />
                                 <span id="details">{order._id}</span>
                              </div>
                           </div>
                        </div>
                        <div class="pricing">
                           {order.products.map((product, index) => {
                              return (
                                 <div class="row">
                                    <div class="col-9">
                                       <span id="name" key={index}>
                                          <span>{index + 1}. </span>
                                          {product.name}
                                          <p></p>
                                       </span>
                                    </div>
                                    <div class="col-3">
                                       <span id="price">₹ {product.price}</span>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                        <div class="total">
                           <div class="row">
                              <div class="col-6">
                                 <span>Total Price :</span>
                              </div>
                              <div class="col-4">
                                 <big>₹ {order.total_amount}</big>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};
export default Orders;

// <span style={{ fontWeight: "normal" }}>{order.txn_id}</span>;
