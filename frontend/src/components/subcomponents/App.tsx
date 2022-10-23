import * as React from "react";

// import CardGroup from "./subcomponents/cards/CardGroup";
// import Home from "./pages/Home";
// import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layout from "./Layout";
import Home from "../pages/Home";
import Tabs from "./tabs/Tabs";

import DetailedPage from "../pages/DetailedPage";
import ConfigurationPage from "../pages/ConfigurationPage";

import { TabItemsNames } from "../../resources/strings";
import CardGroup from "./cards/CardGroup";

function App() {





  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/browse/:browseItem",
          element: <div> <Tabs tabs={TabItemsNames} path={"/browse/"}/> <CardGroup isMyCards={false}/> </div>
        },

        {
          path: "/feed/:id",
          element: <DetailedPage />,
        },
        {
          path: "/feed/configuration/edit/:id",
          element: <ConfigurationPage action="edit"/>
        },
        {
          path: "/feed/configuration/add",
          element: <ConfigurationPage action="add"/>
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App;
