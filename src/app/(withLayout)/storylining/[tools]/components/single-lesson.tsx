"use client";
import MyButton from "@/components/shared/common/my-button";
import { MyLoading } from "@/components/shared/common/my-loading";
import MySectionTitle from "@/components/shared/common/my-section-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KeyConstant } from "@/constants/key.constant";
import { useGetSLSingleContentQuery } from "@/redux/feature/storylining/storylining-api";
import { useMarkContentAsCompletedMutation } from "@/redux/feature/tools/tools-api";
import parse from "html-react-parser";
import { Captions, CheckCircle, ChevronsRight, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SingleLesson = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isModalOpen = searchParams.get(KeyConstant.MODAL);
  const lessonId = searchParams.get(KeyConstant.LESSON_ID);
  const [isMobile, setIsMobile] = useState(false);
  const [isTranscript, setTranscript] = useState(true);

  const { data, isLoading } = useGetSLSingleContentQuery(lessonId);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Change 768 to your desired breakpoint
      setTranscript(window.innerWidth < 1024 ? false : true);
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lesson = data?.data.contents[0];
  const [markToolContentAsCompleted, { isLoading: markLoading }] =
    useMarkContentAsCompletedMutation();

  if (isLoading) {
    return <MyLoading />;
  }
  // if (!lessonId) {
  //   return notFound();
  // }
  return (
    <>
      {isModalOpen === "true" && (
        <div className="fixed top-0 left-0 flex flex-1 w-full bg-gray-500/50 p-2 md:p-5 lg:p-10 h-screen">
          <div className="bg-white h-full w-full rounded-lg pb-0 overflow-y-auto relative">
            <div className="flex flex-col h-full">
              <div className="py-2 px-4 w-full flex justify-end">
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString()); // Clone existing params

                    params.delete(KeyConstant.LESSON_ID);
                    params.delete(KeyConstant.MODAL);

                    router.push(`?${params.toString()}`);
                  }}
                  variant="ghost"
                  className=""
                >
                  <X />
                </MyButton>
              </div>

              <div className="space-y-2 overflow-y-scroll flex-1 p-5 pt-0">
                <div
                  className={`${
                    isTranscript ? "grid" : ""
                  } grid-cols-5 gap-3 transition-all duration-1000 overflow-hidden`}
                >
                  <div className="col-span-4">
                    {/* VIDEO  */}
                    {lesson?.url && (
                      <video
                        src={lesson.url}
                        controls
                        className="rounded-lg w-full md:h-[70vh] bg-black"
                        autoPlay
                      ></video>
                    )}
                    {/* LESSON DETAILS  */}
                    <div>
                      <div className="lg:flex items-center justify-between">
                        <h1 className="text-xl md:text-2xl font-semibold py-3">
                          Lesson: {lesson?.title}
                        </h1>
                        {!isTranscript && (
                          <MyButton
                            startIcon={<Captions />}
                            variant="outline"
                            onClick={() => {
                              setTranscript((prev) => !prev);
                            }}
                            className="border-0 hidden lg:flex"
                          >
                            Transcript
                          </MyButton>
                        )}
                      </div>
                      <p>{lesson?.short_desc}</p>
                      {lesson?.text && <div>{parse(`${lesson?.text}`)}</div>}

                      {/* TRASNCRIPT FOR MOBILE  */}
                      {isMobile && (
                        <Accordion
                          type="single"
                          collapsible
                          className="bg-gray-100 px-4 rounded-lg mt-6"
                        >
                          <AccordionItem
                            value="item-1"
                            className="py-0 border-none"
                          >
                            <AccordionTrigger className="text-xl hover:no-underline py-3">
                              Transcript
                            </AccordionTrigger>
                            <AccordionContent>
                              {lesson?.content}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>

                  {/* TRANSCRIPT  */}
                  {isTranscript && (
                    <div className="col-span-1 bg-gray-100 py-3 px-5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <MySectionTitle title="Transcript" />
                        <MyButton
                          variant="ghost"
                          onClick={() => {
                            setTranscript(() => false);
                          }}
                          className="hover:bg-white"
                        >
                          <ChevronsRight />
                        </MyButton>
                      </div>
                      <p className="pt-2">{lesson?.short_desc}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t bg-white w-full p-3">
                <div className="flex justify-between items-center">
                  <MyButton
                    onClick={() => {
                      markToolContentAsCompleted(lessonId);
                    }}
                    variant="ghost"
                    className="text-green-500 "
                    startIcon={<CheckCircle />}
                    loading={markLoading}
                  >
                    Marked as complete!
                  </MyButton>

                  {/* <div className="space-x-2">
                    <MyButton
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );
                        const existingLesson = params.get(
                          KeyConstant.LESSON_ID
                        );
                        const newLesson = Number(existingLesson) - 1;

                        params.set(KeyConstant.LESSON_ID, newLesson.toString()),
                          router.push(`?${params.toString()}`);
                      }}
                      variant="ghost"
                      // disabled={idx < 1}
                    >
                      Back
                    </MyButton>
                    <MyButton
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );
                        const existingLesson = params.get(
                          KeyConstant.LESSON_ID
                        );
                        const newLesson = Number(existingLesson) + 1;

                        params.set(KeyConstant.LESSON_ID, newLesson.toString()),
                          router.push(`?${params.toString()}`);
                      }}
                      variant="outline"
                      endIcon={<CornerUpRight />}
                    >
                      Next
                    </MyButton>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
