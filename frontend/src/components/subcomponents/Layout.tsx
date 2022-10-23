import * as React from "react";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../globalState/hooks";
import { navigateNavbar } from "../../globalState/reducerActions";
import { NavbarItemsNames } from "../../resources/strings";
import Navbar from "./navbar/Navbar"
import { TabItemsNames } from "../../resources/strings";
import {navigateTab} from "../../globalState/reducerActions"

const Layout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      dispatch(navigateNavbar(NavbarItemsNames.HOME));
    }
    if (pathname.slice(1, 7) === "browse") {
      dispatch(navigateNavbar(NavbarItemsNames.BROWSE));
    }
  });
  useEffect(() => {
    TabItemsNames.forEach(tab => {
        if (pathname === `/browse/${tab.toLowerCase()}`) {
            // dispatch(navigateToFeed({useQuery: () => useGetCertainBrowseItemQuery, header: TabItemsNames.APPETIZERS, tag: Categories.APPETIZERS}))
            dispatch(navigateTab(tab))
        }
  
    })
  })

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
