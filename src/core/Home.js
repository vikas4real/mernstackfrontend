import React, { useState, useEffect } from "react";
import "../style.css";
import Base from "./Base";
import Card from "./Components/Card";
import Footer from "./Components/Footer";
import { getProducts } from "./helper/coreapicalls";
const Home = () => {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(false);
   const [iphone, setIphone] = useState([]);
   const [mac, setMac] = useState([]);
   const [ipad, setIpad] = useState([]);

   // <------- Preload all products------>
   const loadAllProducts = () => {
      getProducts().then((data) => {
         if (data.error) {
            setError(data.error);
         } else {
            if (data.products.length > 0) {
               let iphones = data.products.filter(
                  (product) => product.category.name == "iPhone"
               );
               if (iphones.length > 0) {
                  setIphone(iphones);
               }
               setProducts(data.products);
            }
            if (data.products.length > 0) {
               let macs = data.products.filter(
                  (product) => product.category.name == "Mac"
               );
               if (macs.length > 0) {
                  setMac(macs);
               }
               setProducts(data.products);
            }
            if (data.products.length > 0) {
               let ipads = data.products.filter(
                  (product) => product.category.name == "iPad"
               );
               if (ipads.length > 0) {
                  setIpad(ipads);
               }
               setProducts(data.products);
            }
         }
      });
   };
   useEffect(() => {
      loadAllProducts();
   }, []);
   return (
      <div>
         <Base />
         <section className="welcome">
            <h1>iPhone 14</h1>
            <h3>Two great sizes.</h3>
            <h3>Now with a splash of yellow.</h3>
            <h4>
               Starting from ₹69900 <a href="/iphone">Buy now</a>
            </h4>
         </section>

         <section className="grid-full">
            <div className="grid-product-full">
               <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/smb-accessories-201908?wid=1070&hei=480&fmt=png-alpha&.v=1563990869846"></img>
               <div className="grid-detail-sum">
                  <h2>Accessories</h2>
                  <p>Get things done in style.</p>
                  <a href="/accessories">
                     Shop now <i className="fas fa-chevron-right"></i>
                  </a>
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
};

export default Home;
