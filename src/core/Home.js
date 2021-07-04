import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Signup from "../user/Signup";
export default function Home() {
   console.log("API IS", API);
   return (
      <div>
         <Base />
      </div>
   );
}
