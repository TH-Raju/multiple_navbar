import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

export const HeadlineAdvance = () => {
  return (
    <div>
      <div className="py-3 space-y-2">
        <div className="bg-gray-100 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
          <p>Context</p>
        </div>
        <div className="border p-3 text-sm rounded-md">
          <ul className="list-disc px-6 space-y-2">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, illum.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, illum.
            </li>
          </ul>
        </div>
      </div>
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
    </div>
  );
};
