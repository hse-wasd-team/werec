import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../globalState/hooks";
import { currentNavbarID } from "../../../globalState/reducerActions";
import { Link } from "react-router-dom"


interface NavbarItemProps {
  id: string;
  name: string;
  url: string
}

function NavbarItem(props: NavbarItemProps) {
  const currentActiveID = useAppSelector(currentNavbarID);
  const dispatch = useAppDispatch()

  if (currentActiveID === props.id) {
    return (
      <li className="nav-item" onClick={() => {
        // dispatch(navigateNavbar(props.name))
        // dispatch(navigateTab(TabItemsNames.QUICKANDEASY))
      }}>
        <Link to={props.url} className="nav-link active" aria-current="page"> {props.name}</Link>

      </li>
    );
  } else {
    return (
      <li className="nav-item" onClick={() => {
        // dispatch(navigateNavbar(props.name))
        // dispatch(navigateTab(TabItemsNames.QUICKANDEASY))
      }}>
        <Link to={props.url} className="nav-link"> {props.name}</Link>
      </li>
    );
  }
}

export default NavbarItem;
