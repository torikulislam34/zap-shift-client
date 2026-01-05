
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/rootlayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import Services from "../pages/Home/Services/Services";
import PrivetRoute from "../Routs/PrivetRoute";
import SendParcel from "../pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home

      },
      {
        path: 'services',
        Component: Services
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch ('./serviceCenter.json')
      },
      {
        path: 'sendParcel',
        element: <PrivetRoute><SendParcel></SendParcel></PrivetRoute>
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login

      },
      {
        path: 'register',
        Component: Register
      },
      
    ]
  },
]);