"use client";

import MySpacer from "@/components/shared/common/my-spacer";
import MyTitleWithDivider from "@/components/shared/common/my-title-with-divider";
import { ExerciseCard } from "@/components/shared/exercise-card";
import { LessonCard } from "@/components/shared/lesson-card";
import { KeyConstant } from "@/constants/key.constant";
import { useGetSLAllContentQuery } from "@/redux/feature/storylining/storylining-api";
import { useParams, useSearchParams } from "next/navigation";
import { SingleLesson } from "./single-lesson";

export const ToolsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const tab = searchParams.get(KeyConstant.TAB);
  const toolsId = params.tools;

  const { data } = useGetSLAllContentQuery(toolsId);

  const lessons = data?.data?.contents
    .filter((item) => item.type === "LEARNING" && item.difficulty === tab)
    .sort((a, b) => a.order - b.order);

  const exercises = data?.data?.contents
    .filter(
      (item) => item.type === "EMBEDDABLE_EXERCISE" && item.difficulty === tab
    )
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <MyTitleWithDivider title="Lessons" />
      <div className="overflow-x-auto">
        {lessons?.length === 0 && (
          <p className="text-gray-400">No lessons found</p>
        )}
        <div className="flex gap-5 py-1">
          {lessons?.map((item) => (
            <LessonCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      <MySpacer className="h-6" />

      <MyTitleWithDivider title="Exercises" />
      {exercises?.length === 0 && (
        <p className="text-gray-400">No exercises found</p>
      )}
      <div className="grid gap-4">
        {exercises?.map((item) => (
          <ExerciseCard key={item._id} item={item} />
        ))}
      </div>

      <SingleLesson />
    </div>
  );
};
