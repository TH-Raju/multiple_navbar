"use client";
import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import {
  useCalculateRelevanceMutation,
  useGetSLAllContentQuery,
} from "@/redux/feature/storylining/storylining-api";
import { useMarkContentAsCompletedMutation } from "@/redux/feature/tools/tools-api";
import { Input } from "antd";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const HeadlineAdvanceExercise = ({ data }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = data?.difficulty;
  const toolsId = data?.tool_id;

  const [feedback, setFeedback] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [textValue, setTextValue] = useState("");

  const [generateReview, { isLoading: isLoadingReview }] =
    useCalculateRelevanceMutation();
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
      <p className="border p-2 text-sm rounded-md">{data?.question}</p>
      <div className="bg-white p-4 rounded-lg mt-3">
        <div className="pb-3 space-y-2">
          <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
            <p>Context</p>
          </div>
          <div className="border p-3 text-sm rounded-md">
            <ul className="list-disc px-6 space-y-2">
              <li>{data?.headline_context}</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg lg:h-[50vh]">
            <Image
              src={data?.slide_image}
              alt="light-icon"
              className="w-full rounded-lg h-full object-contain"
              loading="lazy"
              width={500}
              height={500}
            />
          </div>

          <div className="">
            <div className="bg-gray-100 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between mb-2">
              <p>HEADLINE</p>
            </div>
            {[1].map((item) => (
              <div key={item}>
                <div className="flex gap-2 rounded-lg items-center hover:cursor-pointer hover:bg-gray-50 h-full">
                  <Input.TextArea
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="Enter your headline here"
                    className="border-primaryColor"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
            {feedback ? (
              <div className="space-x-2">
                <MyButton
                  onClick={() => {
                    setShowAnswer(false);
                    setFeedback("");
                    setTextValue("");
                  }}
                  className="uppercase"
                >
                  Try Again
                </MyButton>
                {nextItem && !isLoading && (
                  <MyButton
                    onClick={() => {
                      setFeedback("");
                      setShowAnswer(false);

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
                  onClick={async () => {
                    if (textValue) {
                      const res = await generateReview({
                        userInput: textValue,
                        expertAnswer: data?.expert_answer,
                      });
                      setFeedback(res?.data?.data?.result?.feedback);
                      setShowAnswer(true);
                      markToolContentAsCompleted(data._id);
                    }
                  }}
                  className="uppercase"
                  loading={isLoading || isLoadingReview}
                >
                  Submit
                </MyButton>

                {nextItem && showAnswer && !isLoading && (
                  <MyButton
                    onClick={() => {
                      setFeedback("");
                      setShowAnswer(false);

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
    </div>
  );
};
