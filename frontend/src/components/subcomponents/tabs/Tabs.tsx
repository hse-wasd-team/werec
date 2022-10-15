import * as React from "react";
import Tab from "./Tab";

interface Tabs {tabs: string[], path: string}

function Tabs({tabs, path}: Tabs) {
  return (
    <>
      <ul className="nav justify-content-center" style={{marginBottom: "40px"}}>
        {tabs.map((el) => {

          return(<Tab key={`${path}${el.toLowerCase()}`} name={el} url={`${path}${el.toLowerCase()}`}/>)
        })}


      </ul>
    </>
  );
}

export default Tabs;
