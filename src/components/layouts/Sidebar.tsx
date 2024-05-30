import React from "react";
import { Layout, Menu } from "antd";
import { MenuProps } from "antd/es/menu";
import { MenuItem } from "../../utils/Interface/Layout";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
  pathname: string;
  menuItems: MenuItem[];
  handleMenuItemClick: (key: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggleSidebar,
  pathname,
  menuItems,
  handleMenuItemClick,
}) => {
  const renderMenuItems = (items: MenuItem[]): MenuProps["items"] =>
    items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.title,
      children: item.options ? renderMenuItems(item.options) : undefined,
      onClick: item.options ? undefined : () => handleMenuItemClick(item.key),
    }));

  return (
    <Sider
      className="shadow shadow-blue-200 z-10"
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSidebar}
    >
      <div className="h-full overflow-hidden hover:overflow-y-auto">
        <Menu
          mode="vertical"
          selectedKeys={[pathname]}
          theme="light"
          items={renderMenuItems(menuItems)}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
