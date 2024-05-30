import React, { useState, useEffect, ReactNode, useContext } from "react";
import { Layout, Menu } from "antd";
import { CiLogout, CiSettings, CiUser } from "react-icons/ci";
import { FaHome, FaMap, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { IsLogin } from "../../config/context/IsLoggedIn";
import { MenuItem } from "../../utils/Interface/Layout";

const { Content } = Layout;

interface MenuProps {
  children: ReactNode;
}

// =======================================================================================
// sidebarItem
// =======================================================================================
const sidebarItem: MenuItem[] = [
  {
    key: "/dashboard",
    icon: <FaHome />,
    title: "Dashboard",
  },
  {
    key: "employee",
    icon: <FaUser />,
    title: "Employee",
    options: [
      {
        key: "/employee/employee-information",
        title: "Employee Information",
      },
      {
        key: "/employee/employee-letter",
        title: "Employee Letter",
      },
      {
        key: "/employee/employee-request",
        title: "Employee Requests",
      },
      {
        key: "/profile",
        title: "Profile",
      },
    ],
  },
  {
    key: "/settings/",
    icon: <FaMap />,
    title: "Maps",
    options: [
      {
        key: "",
        title: "Company",
        options: [
          {
            key: "/settings/company/company-news",
            title: "Company News",
          },
          {
            key: "/settings/company/company-policy",
            title: "Company Policy",
          },
        ],
      },
      {
        key: "/settings/dummy",
        title: "Company Policy",
      },
    ],
  },
];

// =======================================================================================
// navbarItem
// =======================================================================================

const Layouts: React.FC<MenuProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { setIsLoggedIn } = useContext(IsLogin);
  useEffect(() => {
    const isCollapsed = localStorage.getItem("sidebarCollapsed");
    if (isCollapsed && isCollapsed === "true") {
      setCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("sidebarCollapsed", String(!collapsed));
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout").then(() => {
        setTimeout(() => {
          setIsLoggedIn(false);
          sessionStorage.clear();
          navigate("/");
        }, 1000);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuNavbar = (
    <Menu>
      <Menu.Item
        key="profile"
        icon={<CiUser />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item key="setting" icon={<CiSettings />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<CiLogout />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleMenuItemClick = (key: string) => {
    navigate(key);
  };

  return (
    <Layout className="h-screen w-full">
      <Navbar menuNavbar={menuNavbar} />
      <Layout>
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          pathname={location.pathname}
          menuItems={sidebarItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <Content className="w-full h-full overflow-y-auto bg-blue-50">
          <main className="p-3">{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
