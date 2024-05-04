import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  Profile,
  Admin,
  AllJobs,
} from "./pages";

import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, //this is default page
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          { path: "stats", element: <Stats /> },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
  {
    path: "/hello",
    element: <h1>Hello</h1>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
