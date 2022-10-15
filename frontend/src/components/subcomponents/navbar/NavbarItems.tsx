import * as React from "react";
import NavbarItem from "./NavbarItem"
import {NavbarItemsNames, TabItemsNames} from "../../../resources/strings"




function NavbarItems() {

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
     <NavbarItem id={NavbarItemsNames.HOME} name={NavbarItemsNames.HOME} url="/"/>
     {/* <NavbarItem id={NavbarItemsNames.BROWSE} name={NavbarItemsNames.BROWSE} url={`/browse/${TabItemsNames[0].toLowerCase()}`}/> */}
    
    </ul>
  );
}

export default NavbarItems
