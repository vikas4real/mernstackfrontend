import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllUserOrders } from "./helper/userapicalls";
import moment from "moment";
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
      <div className="display-flex">
         <Base />
         <div className="row">
            <div className="col-12">
               <h2 className="text-center  my-3">All Orders</h2>
               <table className="table text-center">
                  <thead>
                     <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date & Time</th>
                     </tr>
                  </thead>

                  {orders.map((order, index) => {
                     return (
                        <tbody>
                           <tr>
                              <th key={index} scope="row">
                                 {order._id}
                              </th>
                              <td>{order.status}</td>
                              <td>
                                 {order.products.map((product, index) => {
                                    return (
                                       <span key={index}>
                                          <span>{index + 1}. </span>
                                          {product.name}
                                          <p></p>
                                       </span>
                                    );
                                 })}
                              </td>
                              <td>{order.txn_id}</td>
                              <td>₹ {order.total_amount}</td>
                              <td>{moment(order.updatedAt).format("L")}</td>
                           </tr>
                        </tbody>
                     );
                  })}
               </table>
            </div>
         </div>
      </div>
   );
};
export default Orders;
