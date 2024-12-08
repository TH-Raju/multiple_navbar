import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronsUpDown, X } from "lucide-react";
import Image from "next/image";

export const VLBeginnerExercise = ({ data }) => {
  return (
    <div>
      <div>
        {data?.optionsType === "a" && (
          <>
            <p className="border p-2 text-sm rounded-md">
              Select the headline that best extracts an insight from the content
              below
            </p>
            <div className="grid md:grid-cols-2 gap-4 rounded-md bg-white p-4 mt-3">
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet, vitae?
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {data?.optionsType === "b" && (
          <>
            <p className="border p-2 text-sm rounded-md">
              Select the slide content that best supports and proves the
              headline below
            </p>
            <div className="bg-white p-4 mt-3">
              <div className="pb-3 space-y-2">
                <div className="bg-gray-100 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
                  <p>Headline</p>
                </div>
                <p className="border p-2 text-sm rounded-md">
                  Select which headline is the clearest example of Kurated slide
                  headline best practices
                </p>
              </div>
              {/* <div className="grid md:grid-cols-2 gap-4"> */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5">
                {[1, 2, 3, 4].map((item, index) => (
                  <div key={item} className="space-y-2">
                    <AlertDialog>
                      <AlertDialogContent>
                        <AlertDialogHeader className="absolute top-0 right-0">
                          <AlertDialogCancel className="w-fit border-none">
                            <X />
                          </AlertDialogCancel>
                        </AlertDialogHeader>

                        <AlertDialogDescription>
                          <Image
                            src={AllImages.chartImage}
                            alt="light-icon"
                            className="w-full rounded-lg h-full object-contain"
                          />
                        </AlertDialogDescription>
                      </AlertDialogContent>

                      <div className="border rounded-lg relative">
                        <AlertDialogTrigger>
                          <Image
                            src={AllImages.chartImage}
                            alt="light-icon"
                            className="w-full rounded-lg h-full object-contain"
                          />
                          <div className="rotate-45 bg-gray-400/50 p-2 rounded-full w-fit absolute right-3 top-3">
                            <ChevronsUpDown size={18} />
                          </div>
                        </AlertDialogTrigger>
                      </div>
                    </AlertDialog>

                    <MyButton
                      onClick={() => {}}
                      variant="ghost"
                      className="border py-1 px-2 text-sm rounded-md text-center font-semibold w-full"
                    >
                      {String.fromCharCode(65 + index)}
                    </MyButton>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
