import { MyLinkButton } from "@/components/shared/common/my-link-button";
import { BookOpen, CircleCheckBig, PlayCircle } from "lucide-react";
import Image from "next/image";
import { ILesson } from "../page";

export default function LessonCard({ item }: { item: ILesson }) {
  return (
    <div className="min-w-[240px] lg:min-w-[300px] space-y-2 w-1/5 mb-6">
      <div className="w-full">
        {item.lessonType === "video" && (
          <Image
            src={item.thumbnail}
            alt={item.label}
            className="w-full object-cover"
          />
        )}
        {item.lessonType === "docs" && (
          <div className="h-full border-2 p-5 rounded-md space-y-6 lg:space-y-7 bg-gray-50">
            <p className="line-clamp-2 lg:line-clamp-3">{item.content}</p>

            <MyLinkButton
              href="/"
              className="bg-transparent text-gray-500 border-2 w-full text-center hover:bg-gray-50"
            >
              Open Lesson
            </MyLinkButton>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center font-medium">
          {item.lessonType === "video" && <PlayCircle size={22} />}
          {item.lessonType === "docs" && <BookOpen size={22} />}
          <h2>{item.label}</h2>
        </div>

        <CircleCheckBig size={20} className={`text-green-500`} />
      </div>
    </div>
  );
}
