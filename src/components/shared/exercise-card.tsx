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
      className={`border-2 p-5 rounded-md space-y-6 ${
        isCompleted ? "bg-[#E3F9D1]" : " bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2 text-gray-700">
        <BookOpen size={22} className="text-gray-700" />
        <p className="font-semibold text-sm md:text-base">{item.title}</p>
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
            ? "bg-transparent text-green-600 border-green-600 hover:bg-[#E3F9D1] border-2 w-full text-center font-semibold"
            : "bg-transparent text-gray-500 border-2 w-full text-center hover:bg-white hover:text-black font-semibold"
        }`}
      >
        Open Exercise
      </MyButton>
    </div>
  );
};
