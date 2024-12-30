"use client";

import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { KeyConstant } from "@/constants/key.constant";
import { useGetSLAllContentQuery } from "@/redux/feature/storylining/storylining-api";
import { useMarkContentAsCompletedMutation } from "@/redux/feature/tools/tools-api";
import { ChevronsUpDown, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const VLAdvanceExercise = ({ data }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = data?.difficulty;
  const toolsId = data?.tool_id;

  const [selectedOption, setSelectedOption] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const [markToolContentAsCompleted, { isLoading }] =
    useMarkContentAsCompletedMutation();
  const { data: allSLContent } = useGetSLAllContentQuery(toolsId);

  const exercisesIndex = allSLContent?.data.contents
    .filter((item) => item.type === data.type && item.difficulty === tab)
    .sort((a, b) => a.order - b.order)
    .map((item) => item._id);

  const currentIndex = exercisesIndex?.indexOf(data._id);

  // Get the next item, or null if it's the last item
  const nextItem =
    currentIndex !== -1 && currentIndex < exercisesIndex?.length - 1
      ? exercisesIndex[currentIndex + 1]
      : null;

  return (
    <div>
      {!data?.headline && (
        <div>
          <p className="border p-2 text-sm rounded-md">{data?.question}</p>
          <div className="bg-white p-4 rounded-lg mt-3">
            <div className="pb-3 space-y-2">
              <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
                <p>Context</p>
              </div>
              <div className="border p-3 text-sm rounded-md">
                <ul className="list-disc px-6 space-y-2">
                  <li>{data?.vertical_logic_context}</li>
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg lg:h-[50vh]">
                <Image
                  src={data?.slide_image}
                  alt="light-icon"
                  className="w-full rounded-lg h-full object-contain"
                  width={500}
                  height={500}
                />
              </div>

              <div className="grid gap-3 lg:gap-5">
                {data?.vertical_logic_options?.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      if (!answer) {
                        setSelectedOption(item._id);
                      }
                    }}
                  >
                    <div
                      className={`flex gap-2 p-3 border rounded-lg items-center hover:cursor-pointer hover:bg-gray-50 h-full ${
                        selectedOption === item._id
                          ? `bg-primaryColor/10 border-primaryColor ${
                              answer.length > 0 && !answer.includes(item._id)
                                ? "bg-red-100 border-red-500"
                                : ""
                            }`
                          : ""
                      } ${
                        showAnswer && answer.includes(item._id)
                          ? "bg-green-100 border-green-500"
                          : ""
                      } `}
                    >
                      <p className="px-2 font-semibold">{item._id}</p>
                      <p className="leading-tight">{item.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {data?.headline && (
        <div>
          <p className="border p-2 text-sm rounded-md">{data?.question}</p>

          <div className="bg-white p-4 rounded-lg mt-3">
            <div className="pb-3 space-y-2">
              <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
                <p>Context</p>
              </div>
              <div className="border p-3 text-sm rounded-md">
                <ul className="list-disc px-6 space-y-2">
                  <li>{data?.vertical_logic_context}</li>
                </ul>
              </div>
            </div>
            <div className="py-3 space-y-2">
              <div className="bg-gray-100 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
                <p>Headline</p>
              </div>
              <p className="border p-2 text-sm rounded-md">{data?.headline}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5">
              {data?.vertical_logic_options?.map((item, index) => (
                <div key={item._id} className="space-y-2">
                  <AlertDialog>
                    <AlertDialogContent>
                      <AlertDialogHeader className="absolute top-0 right-0">
                        <AlertDialogCancel className="w-fit border-none">
                          <X />
                        </AlertDialogCancel>
                      </AlertDialogHeader>

                      <AlertDialogDescription>
                        <Image
                          src={item.data}
                          alt="light-icon"
                          className="w-full rounded-lg h-full object-cover"
                          width={600}
                          height={600}
                          loading="lazy"
                        />
                      </AlertDialogDescription>
                    </AlertDialogContent>

                    <div className="border rounded-lg relative h-56">
                      <AlertDialogTrigger>
                        <Image
                          src={item.data}
                          alt="light-icon"
                          className="w-full rounded-lg h-full object-cover"
                          fill
                          loading="lazy"
                        />
                        <div className="rotate-45 bg-gray-400/50 p-2 rounded-full w-fit absolute right-3 top-3">
                          <ChevronsUpDown size={18} />
                        </div>
                      </AlertDialogTrigger>
                    </div>
                  </AlertDialog>

                  <MyButton
                    onClick={() => {
                      if (!answer) {
                        setSelectedOption(item._id);
                      }
                    }}
                    variant="ghost"
                    className={`border py-1 px-2 text-sm rounded-md text-center font-semibold w-full ${
                      selectedOption === item._id
                        ? `bg-primaryColor/10 border-primaryColor ${
                            answer.length > 0 && !answer.includes(item._id)
                              ? "bg-red-100 border-red-500"
                              : ""
                          }`
                        : ""
                    } ${
                      showAnswer && answer.includes(item._id)
                        ? "bg-green-100 border-green-500"
                        : ""
                    }`}
                  >
                    {item._id}
                  </MyButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div>
        {feedback && (
          <div className="py-3 space-y-2">
            <div className="bg-gray-100 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
              <p>Feedback</p>
            </div>
            <p className="border p-2 text-sm rounded-md">{feedback}</p>
          </div>
        )}
        <MySpacer className="h-20" />
        <div className="fixed bottom-0 left-0 w-full py-2 px-6 bg-gray-100 flex justify-end">
          {answer.length > 0 && !showAnswer ? (
            <div className=" space-x-2">
              <MyButton
                onClick={() => {
                  setAnswer("");
                  setSelectedOption(null);
                  setShowAnswer(false);
                  setFeedback("");
                }}
                className="uppercase"
              >
                Try Again
              </MyButton>
              {nextItem && !isLoading && (
                <MyButton
                  onClick={() => {
                    setFeedback("");
                    setAnswer("");
                    setShowAnswer(false);
                    setSelectedOption(null);

                    const currentParams = new URLSearchParams(
                      searchParams.toString()
                    );
                    currentParams.set(KeyConstant.EXERCISE_ID, nextItem);

                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                  className="uppercase border-green-500 text-green-500"
                  variant="outline"
                >
                  Next
                </MyButton>
              )}
            </div>
          ) : (
            <div className=" space-x-2">
              <MyButton
                onClick={() => {
                  if (
                    data?.correct_answers.some(
                      (answer) => answer._id === selectedOption
                    )
                  ) {
                    setFeedback(data?.default_positive_feedback);
                    setAnswer(data?.correct_answers.map((it) => it._id));
                    setShowAnswer(true);
                    setSelectedOption(null);
                    markToolContentAsCompleted(data._id);
                  } else {
                    setFeedback(data?.default_negative_feedback);
                    setAnswer(data?.correct_answers.map((it) => it._id));
                  }
                }}
                className="uppercase"
                loading={isLoading}
              >
                Submit
              </MyButton>

              {nextItem && showAnswer && !isLoading && (
                <MyButton
                  onClick={() => {
                    setFeedback("");
                    setAnswer("");
                    setShowAnswer(false);
                    setSelectedOption(null);

                    const currentParams = new URLSearchParams(
                      searchParams.toString()
                    );
                    currentParams.set(KeyConstant.EXERCISE_ID, nextItem);

                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                  className="uppercase border-green-500 text-green-500"
                  variant="outline"
                >
                  Next
                </MyButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
