import React, { useState, useEffect } from "react";
import "../style.css";
import Base from "./Base";
import Card from "./Components/Card";
import Footer from "./Components/Footer";
import { getProductsIpad } from "./helper/coreapicalls";
const IPad = () => {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(false);

   // <------- Preload all products------>
   const loadAllProducts = () => {
      getProductsIpad().then((data) => {
         if (data.error) {
            setError(data.error);
         } else {
            setProducts(data.products);
         }
      });
   };
   useEffect(() => {
      loadAllProducts();
   }, []);
   return (
      <div>
         <Base />
         <div className="row text-center">
            <h1>iPad</h1>
            <div className="row">
               {products.map((product, index) => {
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
         </div>
         <Footer />
      </div>
   );
};

export default IPad;
