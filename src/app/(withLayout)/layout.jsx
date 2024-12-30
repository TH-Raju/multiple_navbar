"use client";
import { AllImages } from "@/assets/AllImages";
import { DataConstant } from "@/constants/data.constant";
import { AuthGuard } from "@/Layout/auth-guard";
import { useLogoutMutation } from "@/redux/feature/auth/authApi";
import {
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // For Sider on larger screens
  const [isMobile, setIsMobile] = useState(false); // To track if the screen is mobile
  const [drawerVisible, setDrawerVisible] = useState(false); // For controlling Drawer visibility
  const [logout, { isLoading }] = useLogoutMutation(undefined);
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

  const pathname = usePathname();

  const [current, setCurrent] = useState(
    pathname === "/" || pathname === "" ? "overview" : pathname.split("/")[1]
  );
  //or simply use const [current, setCurrent] = useState(location.pathname)

  useEffect(() => {
    if (pathname) {
      if (current !== pathname) {
        setCurrent(pathname.split("/")[1]);
      }
    }
  }, [pathname, current]);

  function handleClick(e) {
    setCurrent(e.key);
  }
  const onLogOut = async () => {
    await logout(undefined);
    window.location.reload();
  };
  const profileItems = [
    {
      key: "profile",
      label: (
        <Link href={"/profile"} className="text-gray-500">
          My Profile
        </Link>
      ),
    },
    {
      key: "support",
      label: (
        <Link href={"/support"} className="text-gray-500">
          Help and Support
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <p className="text-gray-500 hover:text-red-500" onClick={onLogOut}>
          {isLoading ? "Loading..." : "Logout"}
        </p>
      ),
    },
  ];

  const items = [
    {
      key: "overview",
      icon: collapsed ? <Image src={AllImages.homeIcon} alt="home" /> : "",
      // icon:  <Image src={AllImages.homeIcon} alt="home" />,
      label: (
        <p className="text-base flex gap-2 ml-2">
          <Image src={AllImages.homeIcon} alt="home" />
          <Link href={"/overview"}>Overview</Link>
        </p>
      ),
    },
    {
      key: "framing",
      icon: (
        <Image
          src={AllImages.frameIcon}
          alt="home"
          className={collapsed ? "h-10 w-full object-contain" : ""}
        />
      ),
      label: <p className="text-base">Framing</p>,
      children: [
        {
          key: "g1",
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/framing`}
              className="text-gray-500 font-medium"
            >
              Overview
            </Link>
          ),
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/framing/${DataConstant.FM_SCQ_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              SCQ
            </Link>
          ),
          key: "g2",
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/framing/${DataConstant.FM_HEADLINE_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Headline
            </Link>
          ),
          key: "g2",
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/framing/${DataConstant.FM_EVIDENCE_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Evidence
            </Link>
          ),
          key: "g3",
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/framing/${DataConstant.FM_CHALLENGE_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Challenge
            </Link>
          ),
          key: "g4",
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/framing/${DataConstant.FM_SCENARIOS_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Scenario
            </Link>
          ),
          key: "g4",
        },
      ],
    },
    {
      key: "storylining",
      icon: <Image src={AllImages.storyIcon} alt="home" />,
      label: (
        <p className="text-base">
          Storylining
          {/* <Link href={"/storylining"}>Storylining</Link> */}
        </p>
      ),
      children: [
        {
          key: "g1",
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/storylining`}
              className="text-gray-500 font-medium"
            >
              Overview
            </Link>
          ),
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/storylining/${DataConstant.HEADLINE_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Headline
            </Link>
          ),
          key: "g2",
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/storylining/${DataConstant.HORIZONTAL_LOGIC_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Horizontal Logic
            </Link>
          ),
          key: "g3",
        },
        {
          label: (
            <Link
              rel="noopener noreferrer"
              href={`/storylining/${DataConstant.VERTICAL_LOGIC_TOOL_ID}`}
              className="text-gray-500 font-medium"
            >
              Vertical Logic
            </Link>
          ),
          key: "g4",
        },
      ],
    },
  ];

  // Toggle the Drawer visibility
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <AuthGuard>
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
          <Header
            style={{
              padding: 0,
              background: "#f5f6f8",
            }}
            className="sticky w-full z-50 top-0 border-b"
          >
            {/* Custom Button for Desktop Trigger */}
            <div className=" flex items-center h-full">
              <Button
                type="text"
                icon={collapsed ? <MenuIcon /> : <MenuIcon />}
                onClick={() => {
                  if (isMobile) {
                    toggleDrawer(); // Toggle Drawer on mobile
                  } else {
                    setCollapsed(!collapsed); // Toggle Sider on larger screens
                  }
                }}
                style={{
                  fontSize: "16px",
                  padding: "30px",
                  // width: "40px",
                  // height: 64,
                }}
              />
              <div className="flex w-full justify-between items-center px-4">
                <Image
                  src={AllImages.logoBlack}
                  alt="logo"
                  className="lg:w-fit h-fit"
                />
                <Dropdown menu={{ items: profileItems }}>
                  <div className="p-2">
                    <Image
                      src={AllImages.defaultAvatar}
                      alt="logo"
                      className="w-10 h-10 object-cover rounded-full hover:cursor-pointer"
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>

          <Layout>
            {!isMobile ? (
              <div className="fixed top-0 left-0 pt-16 bg-[#f5f6f8] ">
                <Sider
                  width={250}
                  collapsedWidth={80}
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                  style={{
                    backgroundColor: "#f5f6f8",
                  }}
                  className="h-screen overflow-y-auto  border-r py-2 font-mulish w-[300px]"
                >
                  <Menu
                    mode="inline"
                    className="bg-[#f5f6f8] border-r-0 font-mulish"
                    defaultSelectedKeys={["1"]}
                    items={items}
                    selectedKeys={[current]}
                    onClick={handleClick}
                  />
                </Sider>
              </div>
            ) : (
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
                  className="font-mulish border-none bg-[#f5f6f8]"
                />
              </Drawer>
            )}
            <Layout>
              <Content
                className="p-5 md:p-7 lg:p-10 bg-[#fafafa] font-mulish min-h-[calc(100vh-64px)] overflow-y-auto"
                style={{
                  minHeight: 280,
                  marginLeft: !isMobile ? (collapsed ? 80 : 250) : 0,
                  transition: "margin-left 0.2s ease",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </AuthGuard>
  );
};

export default LayoutComponent;
