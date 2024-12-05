"use client";
import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import MySectionTitle from "@/components/shared/common/my-section-title";
import { ILesson } from "@/components/shared/lesson-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KeyConstant } from "@/constants/key.constant";
import {
  Captions,
  CheckCircle,
  ChevronsRight,
  CornerUpRight,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const lessons: ILesson[] = [
  {
    id: "1",
    label: "Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem voluptates pariatur perferendis assumenda quos est, consectetur dolorem nobis possimus temporibus? Temporibus minima corporis saepe consectetur magni cum omnis, cupiditate numquam dolores architecto quam voluptate alias ad tempora, sed cumque repudiandae, accusantium mollitia fugiat ipsam deleniti libero modi atque! Aliquid, illo architecto. Rerum ipsum cumque, distinctio aut nulla eius nisi sunt possimus illum, excepturi perspiciatis tenetur nihil sed nemo, exercitationem quaerat ab facere minima atque mollitia ducimus laboriosam? Iste praesentium esse expedita quidem ducimus, corporis aliquid, minus quibusdam doloremque rerum quae. Quibusdam iusto obcaecati ut excepturi dicta quo officiis quidem dignissimos laboriosam vitae accusamus sit quasi nisi tenetur in sunt, a atque doloremque at quos! Maiores animi ratione aliquid dolore accusantium quasi quidem, laboriosam est mollitia asperiores hic nostrum exercitationem deserunt, minus repellat similique voluptas dolorem, blanditiis delectus unde quas! Non sequi fugiat possimus vel dignissimos, vero maiores eius provident, perferendis ad corrupti consequuntur culpa quos consequatur praesentium alias modi nulla nemo dolore quis repellendus. Pariatur debitis, minima labore libero eaque nihil consequuntur ipsa explicabo voluptates similique architecto blanditiis quisquam officiis necessitatibus repellendus id! Incidunt laudantium explicabo reiciendis dolores vitae provident facere alias illum, dolore ut non a eaque, quam reprehenderit!",
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
    label: " Introduction to Storylining",
    lessonType: "video",
    thumbnail: AllImages.videoThumb,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem voluptates pariatur perferendis assumenda quos est, consectetur dolorem nobis possimus temporibus? Temporibus minima corporis saepe consectetur magni cum omnis, cupiditate numquam dolores architecto quam voluptate alias ad tempora, sed cumque repudiandae, accusantium mollitia fugiat ipsam deleniti libero modi atque! Aliquid, illo architecto. Rerum ipsum cumque, distinctio aut nulla eius nisi sunt possimus illum, excepturi perspiciatis tenetur nihil sed nemo, exercitationem quaerat ab facere minima atque mollitia ducimus laboriosam? Iste praesentium esse expedita quidem ducimus, corporis aliquid, minus quibusdam doloremque rerum quae. Quibusdam iusto obcaecati ut excepturi dicta quo officiis quidem dignissimos laboriosam vitae accusamus sit quasi nisi tenetur in sunt, a atque doloremque at quos! Maiores animi ratione aliquid dolore accusantium quasi quidem, laboriosam est mollitia asperiores hic nostrum exercitationem deserunt, minus repellat similique voluptas dolorem, blanditiis delectus unde quas! Non sequi fugiat possimus vel dignissimos, vero maiores eius provident, perferendis ad corrupti consequuntur culpa quos consequatur praesentium alias modi nulla nemo dolore quis repellendus. Pariatur debitis, minima labore libero eaque nihil consequuntur ipsa explicabo voluptates similique architecto blanditiis quisquam officiis necessitatibus repellendus id! Incidunt laudantium explicabo reiciendis dolores vitae provident facere alias illum, dolore ut non a eaque, quam reprehenderit!",
  },
];

export const SingleLesson = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isModalOpen = searchParams.get(KeyConstant.MODAL);
  const lessonId = searchParams.get(KeyConstant.LESSON_ID);
  const [isMobile, setIsMobile] = useState(false);
  const [isTrasncript, setTranscript] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Change 768 to your desired breakpoint
      setTranscript(window.innerWidth < 1024 ? false : true);
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const idx = lessons.findIndex((item) => item.id === lessonId);
  const lesson = idx !== -1 ? { idx: idx + 1, ...lessons[idx] } : undefined;

  if (lessonId && idx < 0) {
    router.replace("/404");
  }
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
                    isTrasncript ? "grid" : ""
                  } grid-cols-5 gap-3 transition-all duration-1000 overflow-hidden`}
                >
                  <div className="col-span-4">
                    {/* VIDEO  */}
                    {lesson?.videoUrl && (
                      <video
                        src={lesson.videoUrl}
                        controls
                        className="rounded-lg w-full md:h-[70vh] bg-black"
                        autoPlay
                      ></video>
                    )}
                    {/* LESSON DETAILS  */}
                    <div>
                      <div className="lg:flex items-center justify-between">
                        <h1 className="text-xl md:text-2xl font-semibold py-3">
                          Lesson {lesson.idx}: {lesson.label}
                        </h1>
                        {!isTrasncript && (
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
                      <p>{lesson.content}</p>

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
                              {lesson.content}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>

                  {/* TRANSCRIPT  */}
                  {isTrasncript && (
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
                      <p className="pt-2">{lesson.content}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t bg-white w-full p-3">
                <div className="flex justify-between items-center">
                  <MyButton
                    onClick={() => {}}
                    variant="ghost"
                    className="text-green-500 "
                    startIcon={<CheckCircle />}
                  >
                    Marked as complete!
                  </MyButton>

                  <div className="space-x-2">
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
                      disabled={idx < 1}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
