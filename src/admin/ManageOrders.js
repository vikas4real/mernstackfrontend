import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "./helper/adminapicall";
import moment from "moment";
const ManageOrders = () => {
   const [orders, setOrders] = useState([]);
   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;
   const preload = () => {
      getAllOrders(userId, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
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
                        <th scope="col">Customer E-mail</th>
                        <th scope="col">Customer Name</th>
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
                           <tr key={index}>
                              <td>{order._id}</td>
                              <td>{order.user?.email}</td>
                              <td>
                                 {order.user?.fname} {order.user?.lname}
                              </td>
                              <td>{order.status}</td>
                              <td>
                                 {order.products.map((product, index) => (
                                    <span key={index}>
                                       {index + 1} - {product.name}
                                    </span>
                                 ))}
                              </td>
                              <td>{order.txn_id}</td>
                              <td>{order.total_amount}</td>
                              <td>
                                 {moment(order.createdAt).format(
                                    "DD-MMM-YYYY hh:mm"
                                 )}
                              </td>
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
export default ManageOrders;
