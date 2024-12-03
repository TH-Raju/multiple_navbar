"use client";
import { AllImages } from "@/assets/AllImages";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Drawer, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineFilterFrames } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // For Sider on larger screens
  const [isMobile, setIsMobile] = useState(false); // To track if the screen is mobile
  const [drawerVisible, setDrawerVisible] = useState(false); // For controlling Drawer visibility
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change 768 to your desired breakpoint
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    {
      key: "1",
      icon: <GoHomeFill className="text-yellow-400 text-2xl  " />,
      label: (
        <p className="text-base mt-1">
          <Link href={"/overview"}>Overview</Link>
        </p>
      ),
    },
    {
      key: "2",
      icon: <MdOutlineFilterFrames className="text-yellow-400 text-2xl  " />,
      label: (
        <p className="text-base mt-1">
          <Link href={"/framing"}>Framing</Link>
        </p>
      ),
    },
    {
      key: "3",
      icon: <PiNetworkFill className="text-yellow-400 text-2xl  " />,
      label: <p className="text-base mt-1">Storylining</p>,
    },
  ];

  // Toggle the Drawer visibility
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "rgb(232, 233, 234)",
            itemSelectedColor: "rgb(11,24,38)",
          },
        },
      }}
    >
      <NextTopLoader height={3} />
      <Layout>
        {/* Conditional Rendering of Sider vs Drawer */}
        {!isMobile ? (
          // On larger screens, use Sider with custom trigger
          <>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  if (isMobile) {
                    toggleDrawer(); // Toggle Drawer on mobile
                  } else {
                    setCollapsed(!collapsed); // Toggle Sider on larger screens
                  }
                }}
                className="bg-transparent"
                style={{
                  fontSize: "16px",
                  textAlign: "right",
                  width: 94,
                  height: 64,
                }}
              />

              <Menu
                mode="inline"
                className=" mt-6 bg-[#f5f6f8]"
                defaultSelectedKeys={["1"]}
                items={items}
              />
            </Sider>
          </>
        ) : (
          // On mobile, use Drawer instead of Sider
          <Drawer
            placement="left"
            closable={false}
            onClose={toggleDrawer}
            visible={drawerVisible}
            width={250} // Adjust width as needed
            style={{
              backgroundColor: "#f5f6f8",
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={items}
              style={{
                backgroundColor: "#f5f6f8",
              }}
            />
          </Drawer>
        )}

        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {/* Custom Button for Desktop Trigger */}
            {!isMobile ? (
              <div className="flex items-center h-full ml-5 justify-between">
                <Image src={AllImages.logoBlack} alt="logo" className="" />
                <div className="px-6">
                  <Image
                    src={AllImages.defaultAvatar}
                    alt="logo"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => {
                    if (isMobile) {
                      toggleDrawer(); // Toggle Drawer on mobile
                    } else {
                      setCollapsed(!collapsed); // Toggle Sider on larger screens
                    }
                  }}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <div className="flex w-full justify-between items-center">
                  <Image
                    src={AllImages.logoBlack}
                    alt="logo"
                    className="w-20 lg:w-fit h-fit"
                  />
                  <div className="px-6">
                    <Image
                      src={AllImages.defaultAvatar}
                      alt="logo"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutComponent;
