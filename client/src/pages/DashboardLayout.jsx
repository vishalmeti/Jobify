import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";

import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const loader = async () => {  //loaders are like prefetching tools, it fetches the data and provides to the dashboard when it loads
  // try {
    const { data } = await customFetch('/users/current-user');
    return data;
  // } catch (error) {
  //   return redirect('/');
  // }
};

const DashboardContext = createContext();
const Dashboard = () => {
  const {user}  = useLoaderData();
  const navigate = useNavigate();
  console.log(user)
  // const user = {name : 'Vishal'}

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.post('/auth/logout');
    toast.success('Logged Out',{
      autoClose:800, 
      closeButton: false,
    });
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {/* childern render at the place of outlet  */}
              <Outlet user={user} />  
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
