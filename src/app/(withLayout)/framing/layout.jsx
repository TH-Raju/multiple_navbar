import { AllImages } from "@/assets/AllImages";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const items = [
    {
      label: (
        <Link
          rel="noopener noreferrer"
          href="/framing/scq"
          className="text-gray-500 font-medium"
        >
          SCQ
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          rel="noopener noreferrer"
          href="/framing/mcq"
          className="text-gray-500 font-medium"
        >
          MCQ
        </Link>
      ),
      key: "0",
    },
  ];

  return (
    <>
      <div>
        <div className="flex items-center relative">
          <div className="hidden md:block absolute left-0 top-0">
            <Image src={AllImages.framing} alt="logo" />
          </div>
          <div className="w-full flex gap-6 items-center justify-center">
            <Link
              href={"/framing"}
              className="text-gray-500 font-medium hover:bg-gray-50 rounded-md p-2"
            >
              Overview
            </Link>

            <Dropdown menu={{ items }}>
              <div className="hover:bg-gray-50 rounded-md p-2">
                <Space className="text-gray-500 font-medium hover:cursor-pointer">
                  Tools
                  <DownOutlined size={14} />
                </Space>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      {children}
    </>
  );
};

export default LayoutComponent;
