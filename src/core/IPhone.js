import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import Footer from "./Footer";
import { getProductsIphone } from "./helper/coreapicalls";
const IPhone = () => {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(false);

   // <------- Preload all products------>
   const loadAllProducts = () => {
      getProductsIphone().then((data) => {
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
            <h1>iPhone</h1>
            <div className="row">
               {products.map((product, index) => {
                  return (
                     <div key={index} className="col-3 mb-4">
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

export default IPhone;
