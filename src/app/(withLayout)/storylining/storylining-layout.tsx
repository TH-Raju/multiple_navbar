"use client";
import { AllImages } from "@/assets/AllImages";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";

const StoryLiningLayoutComponent = ({ children }) => {
  const items = [
    {
      label: (
        <Link
          rel="noopener noreferrer"
          href={`/storylining/65f81884ea44df0751d0a15b`}
          className="text-gray-500 font-medium"
        >
          Headline
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          rel="noopener noreferrer"
          href="/storylining/649c678b30192b94e7f1b25b"
          className="text-gray-500 font-medium"
        >
          Horizontal Logic
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          rel="noopener noreferrer"
          href="/storylining/65f8187bea44df0751d0a154"
          className="text-gray-500 font-medium"
        >
          Vertical Logic
        </Link>
      ),
      key: "2",
    },
  ];

  return (
    <>
      <div>
        <div className="flex items-center relative">
          <div className="hidden md:block absolute left-0 top-0">
            <Image src={AllImages.storyliningIcon} alt="logo" />
          </div>
          <div className="w-full flex gap-6 items-center justify-center">
            <Link
              href={"/storylining"}
              className="text-gray-500 font-bold hover:bg-gray-50 rounded-md p-2"
            >
              Overview
            </Link>

            <Dropdown menu={{ items }}>
              <div className="hover:bg-gray-50 rounded-md p-2">
                <Space className="text-gray-500 font-bold hover:cursor-pointer">
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

export default StoryLiningLayoutComponent;
