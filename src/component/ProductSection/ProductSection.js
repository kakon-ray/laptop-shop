import React from "react";
import Product from "../ProductSection/Product"

const HomePage = ({title}) => {
  return (
    <div className="py-5">
       <div className="container">
       <div className="row">
         <div> 
            <h2 className="text-center pt-4 pb-2">{title}</h2>    
         </div>
         </div>
         <div className="row">
         <Product></Product>
         <Product></Product>
         <Product></Product>
         <Product></Product>
         <Product></Product>
         <Product></Product>
         <Product></Product>
         </div>
       </div>
    </div>
  );
};

export default HomePage;