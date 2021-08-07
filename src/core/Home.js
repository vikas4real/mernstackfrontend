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
            <h1>iPhone 12</h1>
            <h3>Blast past fast.</h3>
            <h4>Starts from ₹69900. </h4>
         </section>

         <div className="row">
            <h1 className="text-center mt-3">iPhone</h1>
            {iphone.map((product, index) => {
               return (
                  <div
                     key={index}
                     className="container mt-5 mb-5 col-lg-3 col-md-4 col-sm-12"
                  >
                     <Card product={product} />
                  </div>
               );
            })}
         </div>
         <div className="row">
            <h1 className="text-center mt-3">Macbook & iMac</h1>
            {mac.map((product, index) => {
               return (
                  <div
                     key={index}
                     className="container mt-5 mb-5 col-lg-3 col-md-4 col-sm-12"
                  >
                     <Card product={product} />
                  </div>
               );
            })}
         </div>
         <div className="row">
            <h1 className="text-center mt-3">iPad</h1>
            {ipad.map((product, index) => {
               return (
                  <div
                     key={index}
                     className="container mt-5 mb-5 col-lg-3 col-md-4 col-sm-12"
                  >
                     <Card product={product} />
                  </div>
               );
            })}
         </div>
         <Footer />
      </div>
   );
};

export default Home;
