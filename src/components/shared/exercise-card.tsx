"use client";
import { KeyConstant } from "@/constants/key.constant";
import { useGetUserProgressQuery } from "@/redux/feature/tools/tools-api";
import { BookOpen } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import MyButton from "./common/my-button";

export interface IExercise {
  id: string;
  label: string;
}

export const ExerciseCard = ({ item }) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const { data: userProgress } = useGetUserProgressQuery(undefined);

  const isCompleted = userProgress?.data?.progress?.tools[
    params.tools.toString()
  ]?.contentExceptExercise?.includes(item._id);

  return (
    <div
      className={`flex items-center justify-between border-2 px-6 py-3 rounded-md ${
        isCompleted ? "bg-[#E3F9D1]" : " bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2 text-gray-700">
        <BookOpen size={22} className="text-gray-700" />
        <p className="font-semibold text-sm md:text-sm">{item.title}</p>
      </div>

      <MyButton
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(KeyConstant.EXERCISE_ID, item._id);

          router.push(`${pathName}/exercise?${params.toString()}`);
        }}
        variant="ghost"
        className={`${
          isCompleted
            ? "bg-transparent text-green-600 text-sm border-green-600 hover:bg-[#E3F9D1] border-2 w-fit text-center font-semibold"
            : "bg-transparent text-gray-500 text-sm border-2 w-fit text-center hover:bg-white hover:text-black font-semibold"
        }`}
      >
        {isCompleted ? "Redo Exercise" : "Open Exercise"}
      </MyButton>
    </div>
  );
};
