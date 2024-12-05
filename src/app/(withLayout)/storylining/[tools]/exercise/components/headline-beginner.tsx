import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

export const BeginnerExercise = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="border rounded-lg lg:h-[50vh]">
        <Image
          src={AllImages.chartImage}
          alt="light-icon"
          className="w-full rounded-lg h-full object-contain"
        />
      </div>
      <div className="grid gap-3 lg:gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div key={item}>
            <div className="flex gap-2 p-3 border rounded-lg items-center hover:cursor-pointer hover:bg-gray-50 h-full">
              <p className="px-2 font-semibold">{item}</p>
              <p className="leading-tight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                vitae?
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
