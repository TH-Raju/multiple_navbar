"use client";

import MySectionTitle from "@/components/shared/common/my-section-title";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyConstant } from "@/constants/key.constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LayoutComponent = ({ children, params }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = searchParams.get(KeyConstant.TAB);
  const tabList = [
    {
      title: "Beginner",
      value: "beginner",
      visibility: true,
    },
    {
      title: "Intermediate",
      value: "intermediate",
      visibility: true,
    },
    {
      title: "Advance",
      value: "advance",
      visibility: params.tools === "vertical-logic" ? false : true,
    },
  ];

  useEffect(() => {
    if (tab === null || tab === "") {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set(KeyConstant.TAB, "beginner");

      // Update the URL without reloading the page
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, []);

  console.log(tab);

  return (
    <>
      <div className="py-6">
        <div className="lg:flex items-center gap-2 relative space-y-3 lg:space-y-0">
          <div className="lg:absolute left-0 top-1 flex items-center justify-center gap-2">
            <p className="font-medium text-xl">TOOL</p>
            <MySectionTitle
              title={`${params.tools}`.split("-").join(" ").toUpperCase()}
              className="text-center p-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="w-full flex justify-center">
            <div>
              <Tabs defaultValue={tab || "beginner"} className="">
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

export default LayoutComponent;
