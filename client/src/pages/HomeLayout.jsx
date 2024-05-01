import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  // When <Outlet /> is used within a parent component, it indicates that this is where the child routes
  // defined in the parent's routing configuration should be rendered. So, any child routes of the parent route 
  // associated with HomeLayout will be rendered in place of the <Outlet /> component when the appropriate URL is matched.
  return (
    <>
      {/* add things like Navbar */}
      {/* <h1>home layout</h1> */}
      <Outlet />
    </>
  );
};
export default HomeLayout;