import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { useGetSLAllContentQuery } from "@/redux/feature/storylining/storylining-api";
import { useMarkContentAsCompletedMutation } from "@/redux/feature/tools/tools-api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const HLBeginnerExercise = ({ data }) => {
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
      <p className="border p-2 text-sm rounded-md">{data?.question}</p>

      <div className="bg-white p-3 space-y-3 rounded-lg mt-3">
        {data?.horizontal_logic_options?.map((item) => (
          <div
            key={item}
            onClick={() => {
              if (!answer) {
                setSelectedOption(item._id);
              }
            }}
            className={`border rounded-lg p-2 flex items-center gap-2 hover:cursor-pointer hover:border-gray-500 ${
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
            <p className="font-semibold px-5">{item._id}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              {item?.data?.map((it) => (
                <div className="bg-gray-100 p-4 rounded-md" key={it}>
                  <p>{it.data}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
