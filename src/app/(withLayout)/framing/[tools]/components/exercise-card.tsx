import { MyLinkButton } from "@/components/shared/common/my-link-button";
import { BookOpen } from "lucide-react";
import { IExercise } from "../page";

export default function ExerciseCard({ item }: { item: IExercise }) {
  return (
    <div className="border-2 p-5 rounded-md space-y-6 bg-gray-50">
      <div className="flex items-center gap-2 text-gray-700">
        <BookOpen size={22} className="text-gray-700" />

        <p className="font-medium text-sm md:text-base">{item.label}</p>
      </div>

      <MyLinkButton
        href="/"
        className="bg-transparent text-gray-500 border-2 w-full text-center hover:bg-gray-50"
      >
        Open Lesson
      </MyLinkButton>
    </div>
  );
}
