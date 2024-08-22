import React from "react";
import style from "./Spiner.module.css";

const Spinner = () => {
  return <div className="flex flex-col items-center w-full">
      <div className={style.spinner}></div>
      <p className="text-center">Loading products...</p>
  </div> 

    
};

export default Spinner;
