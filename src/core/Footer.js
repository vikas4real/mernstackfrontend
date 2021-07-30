import React from "react";
import "../styles.css";
export default function Footer() {
   return (
      <div>
         <footer>
            <div className="footer-main">
               <div className="footer-detail">
                  <p>
                     All prices are inclusive of GST. Free delivery for all
                     orders.
                  </p>

                  <p>
                     **For approved customers only. Subject to approval. For
                     more information, see{" "}
                     <a href="#">http://www.apple.com/th-en/help/payments.</a>
                  </p>
               </div>

               <div className="footer-welcome">
                  <i className="fab fa-apple"></i>
                  <i className="fas fa-chevron-right"></i>
                  <p>Welcome to the Apple Store</p>
               </div>

               <div className="footer-ul">
                  <ul>
                     <li>
                        <h4>Shop and Learn</h4>
                     </li>
                     <li>
                        <a href="#">Mac</a>
                     </li>
                     <li>
                        <a href="#">iPad</a>
                     </li>
                     <li>
                        <a href="#">iPhone</a>
                     </li>
                     <li>
                        <a href="#">Apple Watch</a>
                     </li>
                     <li>
                        <a href="#">TV</a>
                     </li>

                     <li>
                        <a href="#">Accessories</a>
                     </li>
                  </ul>

                  <ul>
                     <li>
                        <h4>Apple Store</h4>
                     </li>
                     <li>
                        <a href="#">Apple Store App</a>
                     </li>

                     <li>
                        <a href="#">Shopping Help</a>
                     </li>
                  </ul>

                  <ul>
                     <li>
                        <h4>For Education</h4>
                     </li>

                     <li>
                        <a href="#">Shop for College</a>
                     </li>
                     <li id="mt">
                        <h4>For Business</h4>
                     </li>

                     <li>
                        <a href="#">shop for Business</a>
                     </li>
                  </ul>

                  <ul>
                     <li>
                        <h4>Account</h4>
                     </li>
                     <li>
                        <a href="#">Manage Your Apple ID</a>
                     </li>
                     <li>
                        <a href="#">iCloud.com</a>
                     </li>
                     <li id="mt">
                        <h4>Apple Values</h4>
                     </li>
                     <li>
                        <a href="#">Accessibility</a>
                     </li>
                     <li>
                        <a href="#">Environment</a>
                     </li>
                     <li>
                        <a href="#">Privacy</a>
                     </li>
                  </ul>

                  <ul>
                     <li>
                        <h4>About Apple</h4>
                     </li>
                     <li>
                        <a href="#">Newsroom</a>
                     </li>
                     <li>
                        <a href="#">Investors</a>
                     </li>
                     <li>
                        <a href="#">Events</a>
                     </li>
                     <li>
                        <a href="#">Contact Apple</a>
                     </li>
                  </ul>
               </div>

               <div className="footer-contact">
                  <p>
                     More ways to shop: visit an <a href="#">Apple Store, </a>
                     Call 001‑800‑65‑6957, or <a href="#">find a seller</a>
                  </p>
               </div>
               <div className="footer-copyright">
                  <p>Copyright © 2021 Apple Inc. All rights reserved.</p>

                  <ul>
                     <li>
                        <a href="#">Privacy Policy</a>
                     </li>
                     <div className="vr"></div>
                     <li>
                        <a href="#">Terms of Use</a>
                     </li>
                     <div className="vr"></div>
                     <li>
                        <a href="#">Sales and Refunds</a>
                     </li>
                     <div className="vr"></div>
                     <li>
                        <a href="#">Legal</a>
                     </li>
                     <div className="vr"></div>
                     <li>
                        <a href="#">Sitemap</a>
                     </li>
                  </ul>

                  <div className="footer-lang">
                     <div className="circle">
                        <img src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"></img>
                     </div>

                     <p>English</p>
                     <div className="vr"></div>
                     <p>India</p>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
