import React from "react";
import style from "./Spiner.module.css";

const Spinner:React.FC<{title:string}> = ({title}) => {
  return <div className="flex flex-col items-center w-full">
      <div className={style.spinner}></div>
      <p className="text-center text-custom-white">{title}</p>
  </div> 

    
};

export default Spinner;
