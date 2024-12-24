"use client";

import { KeyConstant } from "@/constants/key.constant";
import { useGetUserProgressQuery } from "@/redux/feature/tools/tools-api";
import { BookOpen, CircleCheckBig, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import MyButton from "./common/my-button";

export const LessonCard = ({ item }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();

  const { data: userProgress } = useGetUserProgressQuery(undefined);

  const updateParams = (lessonId: string) => {
    const params = new URLSearchParams(searchParams.toString()); // Clone existing params
    params.set(KeyConstant.LESSON_ID, lessonId);
    params.set(KeyConstant.MODAL, "true");

    router.push(`?${params.toString()}`);
  };

  const isCompleted = userProgress?.data?.progress?.tools[
    params.tools.toString()
  ]?.contentExceptExercise?.includes(item._id);

  return (
    <div className="min-w-[240px] lg:min-w-[300px] space-y-2 w-1/5 mb-6 group">
      <div className="w-full h-40">
        {item.subtype === "VIDEO" && (
          <div className="relative">
            <div className="absolute bg-gray-600 h-full w-full top-0 rounded-md bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MyButton
                onClick={() => updateParams(item._id)}
                variant="outline"
                className="bg-transparent text-white rounded-full"
              >
                Watch Now
              </MyButton>
            </div>
            <div className="h-40">
              <Image
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover rounded-md"
                width={300}
                height={160}
              />
            </div>
          </div>
        )}
        {item.subtype === "TEXTUAL" && (
          <div className="h-full border-2 p-5 rounded-md bg-gray-50 flex flex-col justify-between">
            <p className="line-clamp-2 lg:line-clamp-3 font-semibold">
              {item.title}
            </p>
            <MyButton
              onClick={() => updateParams(item._id)}
              variant="outline"
              className="bg-transparent text-gray-600 border-2 w-full font-semibold text-center hover:bg-white hover:text-black"
            >
              Open Lesson
            </MyButton>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center font-medium">
          {item.subtype === "VIDEO" && <PlayCircle size={22} />}
          {item.subtype === "TEXTUAL" && <BookOpen size={22} />}
          <h2 className="font-semibold">{item.title}</h2>
        </div>

        {isCompleted && (
          <CircleCheckBig size={20} className={`text-green-500`} />
        )}
      </div>
    </div>
  );
};
