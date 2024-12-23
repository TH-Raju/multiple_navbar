"use client";

import MySectionTitle from "@/components/shared/common/my-section-title";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataConstant } from "@/constants/data.constant";
import { KeyConstant } from "@/constants/key.constant";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";

const ToolsLayoutComponent = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const toolsId = params.tools;

  const tab = searchParams.get(KeyConstant.TAB);
  const tabList = [
    {
      title: "Beginner",
      value: "EASY",
      visibility: true,
    },
    {
      title: "Intermediate",
      value: "INTERMEDIATE",
      visibility:
        toolsId === DataConstant.HORIZONTAL_LOGIC_TOOL_ID ? true : false,
    },
    {
      title: "Advance",
      value: "ADVANCED",
      visibility: true,
    },
  ];

  useEffect(() => {
    if (tab === null || tab === "") {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set(KeyConstant.TAB, "EASY");

      // Update the URL without reloading the page
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, []);

  return (
    <>
      <div className="py-6">
        <div className="lg:flex items-center gap-2 relative space-y-3 lg:space-y-0">
          <div className="lg:absolute left-0 top-1 flex items-center justify-center gap-2">
            <p className="font-medium text-xl">TOOL</p>
            <MySectionTitle
              title={DataConstant.TOOLS.find((it) => it.id === toolsId)?.name}
              className="text-center p-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="w-full flex justify-center">
            <div>
              <Tabs defaultValue={tab || "EASY"} className="">
                <TabsList>
                  {tabList
                    .filter((it) => it.visibility)
                    .map((item) => (
                      <TabsTrigger
                        value={item.value}
                        onClick={() => {
                          const currentParams = new URLSearchParams(
                            searchParams
                          );
                          currentParams.set(KeyConstant.TAB, item.value);

                          // Update the URL without reloading the page
                          router.push(
                            `${pathname}?${currentParams.toString()}`
                          );
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

export default ToolsLayoutComponent;
