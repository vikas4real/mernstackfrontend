import React, { useState, useEffect } from "react";
import "../style.css";
import Base from "./Base";
import Card from "./Components/Card";
import Footer from "./Components/Footer";
import { getProductsWatch } from "./helper/coreapicalls";
const Watch = () => {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(false);

   // <------- Preload all products------>
   const loadAllProducts = () => {
      getProductsWatch().then((data) => {
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
         <div
            className="breadcrumb-header"
            style={{
               height: "200px",
               backgroundColor: "#fff",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               textAlign: "center",
               borderBottom: "1px solid #ddd",
               padding: "0 20px",
               marginBottom: "20px",
            }}
         >
            <h1
               style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#333",
                  margin: "0",
               }}
            >
               Watch
            </h1>
         </div>
         <div className="row text-left mb-4 mx-4">
            {products.map((product, index) => {
               return (
                  <div
                     key={index}
                     className="col-lg-3 col-md-6 col-sm-12 mb-4" // 4 products on large screen, 2 on medium, 1 on small
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

export default Watch;
