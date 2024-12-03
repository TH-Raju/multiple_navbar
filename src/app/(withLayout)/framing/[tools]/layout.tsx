"use client";

import MySectionTitle from "@/components/shared/common/my-section-title";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyConstant } from "@/constants/key.constant";
import { Layout } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const { Header, Content } = Layout;

const LayoutComponent = ({ children, params }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = searchParams.get(KeyConstant.TAB);
  const tabList = [
    {
      title: "Beginner",
      value: "beginner",
    },
    {
      title: "Intermediate",
      value: "intermediate",
    },
    {
      title: "Advance",
      value: "advance",
    },
  ];

  useEffect(() => {
    if (tab === null || tab === "") {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set(KeyConstant.TAB, "beginner");

      // Update the URL without reloading the page
      router.push(`${pathname}?${currentParams.toString()}`);
    }
  }, []);

  console.log(tab);

  return (
    <>
      <div className="py-6">
        <div className="lg:flex items-center gap-2 relative">
          <MySectionTitle
            title={`${params.tools}`.toUpperCase()}
            className="lg:absolute left-0 top-1 text-center py-2"
          />
          <div className="w-full flex justify-center">
            <div>
              <Tabs defaultValue={tab || "beginner"} className="">
                <TabsList>
                  {tabList.map((item) => (
                    <TabsTrigger
                      value={item.value}
                      onClick={() => {
                        const currentParams = new URLSearchParams(searchParams);
                        currentParams.set(KeyConstant.TAB, item.value);

                        // Update the URL without reloading the page
                        router.push(`${pathname}?${currentParams.toString()}`);
                      }}
                    >
                      {item.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default LayoutComponent;
