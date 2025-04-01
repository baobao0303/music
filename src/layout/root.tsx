import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const routes = [
  {
    key: "1",
    icon: null,
    lable: "Songs",
    children: [
      {
        key: "/manage-songs",
        lable: "Manage Songs",
      },
      {
        key: "/upload",
        lable: "Upload Song",
      },
    ],
  },
  {
    key: "2",
    icon: null,
    lable: "Artist",
  },
  {
    key: "3",
    icon: null,
    lable: "Album",
  },
];

const items2: MenuProps["items"] = routes.map((route) => {
  return {
    key: route.key,
    icon: route.icon,
    label: route.lable,
    children: route?.children?.map((item) => {
      return {
        key: item.key,
        label: item.lable,
      };
    }),
  };
});

export default function RootLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //   STATE
  const [selectedChildrenKeys, setSelectChildrenKeys] = useState<string[]>([]);
  const [selectParentKeys, setSelectParentKeys] = useState<string[]>([]);

  //    ROUTER DOM
  const location = useLocation();

  useEffect(() => {
    const parent = routes.find((route) => {
      route?.children?.some((item) => item.key === location.pathname);
    });

    if (parent) {
      const parentKey = parent.key;
      setSelectParentKeys([parentKey]);
    }
    setSelectChildrenKeys([location.pathname]);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          selectedKeys={[selectedChildrenKeys[0]]} // children
          openKeys={[selectParentKeys[0]]} // parent
          onOpenChange={(openKeys) => {
            setSelectParentKeys(openKeys);
          }}
        />
      </Header>
      {/* style={{ padding: "0 48px" }} */}
      <div>
        <Layout style={{ padding: "24px 0", background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: "100vh" }}>
            <Outlet />
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
}
