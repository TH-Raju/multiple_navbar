"use client";
import MySpacer from "@/components/shared/common/my-spacer";
import { Flex, Progress } from "antd";

export const OverallProgress = () => {
  return (
    <div className="border rounded-lg border-gray-300 shadow-sm p-5">
      <div className="flex items-center justify-between gap-4 font-semibold text-base border-b-2 pb-2">
        <p className="w-fit whitespace-nowrap">Overall Progress</p>
        <Progress type="line" percent={25} strokeColor={"#EAB030"} />
      </div>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-base">Headline</p>

            <MySpacer className="h-3" />
            <div className="text-xs text-gray-400">
              <p>Lessons: 3/7</p>
              <p>Exercises: 10/50</p>
            </div>
          </div>
          <Flex gap="small" wrap>
            <Progress
              type="circle"
              percent={75}
              strokeColor={"#EAB030"}
              strokeWidth={10}
              size={80}
            />
          </Flex>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-base">Vertical Logic</p>

            <MySpacer className="h-3" />
            <div className="text-xs text-gray-400">
              <p>Lessons: 3/7</p>
              <p>Exercises: 10/50</p>
            </div>
          </div>
          <Flex gap="small" wrap>
            <Progress
              type="circle"
              percent={75}
              strokeColor={"#EAB030"}
              strokeWidth={10}
              size={80}
            />
          </Flex>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-base">Horizontal Logic</p>

            <MySpacer className="h-3" />
            <div className="text-xs text-gray-400">
              <p>Lessons: 3/7</p>
              <p>Exercises: 10/50</p>
            </div>
          </div>
          <Flex gap="small" wrap>
            <Progress
              type="circle"
              percent={75}
              strokeColor={"#EAB030"}
              strokeWidth={10}
              size={80}
            />
          </Flex>
        </div>
      </div>
    </div>
  );
};
