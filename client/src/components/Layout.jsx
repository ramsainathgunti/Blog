import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="main">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
