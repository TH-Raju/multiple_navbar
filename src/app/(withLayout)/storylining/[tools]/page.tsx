"use client";
import { AllImages } from "@/assets/AllImages";
import MySpacer from "@/components/shared/common/my-spacer";
import MyTitleWithDivider from "@/components/shared/common/my-title-with-divider";
import { ExerciseCard, IExercise } from "@/components/shared/exercise-card";
import { ILesson, LessonCard } from "@/components/shared/lesson-card";
import { useGetToolContentQuery } from "@/redux/feature/storylingin-api";
import StoryLiningLayoutComponent from "../storylining-layout";
import { SingleLesson } from "./components/single-lesson";
import ToolsLayoutComponent from "./tools-layout";

export interface ILessonSearchParams {
  tab: string;
  id: string;
  modal: string;
}
const lessons: ILesson[] = [
  {
    id: "1",
    label: "Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl: "",
    content: "",
  },
  {
    id: "2",
    label: "Introduction to Storylining",
    lessonType: "docs",
    thumbnail: AllImages.videoThumb,
    videoUrl: "",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam autem nostrum voluptas eligendi harum delectus voluptates totam, nam deserunt laudantium!",
  },
  {
    id: "3",
    label: "Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl: "",
    content: "",
  },
  {
    id: "2",
    label: "Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl: "",
    content: "",
  },
  {
    id: "2",
    label: "Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl: "",
    content: "",
  },
  {
    id: "2",
    label: "Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl: "",
    content: "",
  },
];
const exercises: IExercise[] = [
  {
    id: "1",
    label: "Introduction to Storylining",
  },
  {
    id: "2",
    label: "Introduction to Storylining",
  },
  {
    id: "3",
    label: "Introduction to Storylining",
  },
  {
    id: "4",
    label: "Introduction to Storylining",
  },
  {
    id: "5",
    label: "Introduction to Storylining",
  },
  {
    id: "1",
    label: "Introduction to Storylining",
  },
  {
    id: "1",
    label: "Introduction to Storylining",
  },
];
export default function StoryliningToolsPage({
  params,
  searchParams,
}: {
  params: { tools: string };
  searchParams: ILessonSearchParams;
}) {
  const { data, isLoading } = useGetToolContentQuery(params.tools);
  console.log("data:", data);
  console.log("loading:", isLoading);

  return (
    <StoryLiningLayoutComponent>
      <ToolsLayoutComponent params={params}>
        <MyTitleWithDivider title="Lessons" />
        <div
          className="overflow-x-auto 
        "
        >
          <div className="flex gap-5 py-1">
            {lessons.map((item) => (
              <LessonCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <MySpacer className="h-6" />

        <MyTitleWithDivider title="Exercises" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.map((item) => (
            <ExerciseCard key={item.id} item={item} />
          ))}
        </div>

        <SingleLesson />
      </ToolsLayoutComponent>
    </StoryLiningLayoutComponent>
  );
}
