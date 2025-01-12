"use client";

import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataConstant } from "@/constants/data.constant";
import { KeyConstant } from "@/constants/key.constant";
import { useGetSLSingleContentQuery } from "@/redux/feature/storylining/storylining-api";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { HeadlineAdvanceExercise } from "./headline-advance";
import { HeadlineBeginnerExercise } from "./headline-beginner";
import { HLAdvanceExercise } from "./hl-advance";
import { HLBeginnerExercise } from "./hl-beginner";
import { HLIntermediateExercise } from "./hl-intermediate";
import { VLAdvanceExercise } from "./vl-advance";
import { VLBeginnerExercise } from "./vl-beginner";

const exerciseData = [
  {
    id: "1",
    optionsType: "a",
  },
  {
    id: "2",
    optionsType: "b",
  },
];
export function Exercise() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const params = useParams();

  const tab = searchParams.get(KeyConstant.TAB);
  const exerciseId = searchParams.get(KeyConstant.EXERCISE_ID);
  const { data } = useGetSLSingleContentQuery(exerciseId);

  const exercise = data?.data?.contents[0];
  const routePath = [
    ...pathName.split("-").join(" ").split("/").slice(1, -1),
    `${tab}`,
    `${exercise?.title}`,
  ];

  const breadcrumb = routePath.map((item, index) => {
    if (index === 1) {
      const tool = DataConstant.TOOLS.find((tool) => tool.id === item);
      return tool ? tool.name : item; // Replace with name if match found, else keep original
    }
    return item;
  });

  return (
    <div>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {routePath.map((name, index) => {
              const routeTo = `/${routePath.slice(0, index + 1).join("/")}`;
              const isSecondLast = index === routePath.length - 2;
              const isLast = index === routePath.length - 1;

              return (
                <BreadcrumbItem className="font-semibold capitalize text-xs md:text-sm">
                  {isLast || isSecondLast ? (
                    name // Render text for the last segment
                  ) : (
                    <Link
                      href={routeTo}
                      className="hover:underline text-gray-500"
                    >
                      {index === 1
                        ? routePath.map((item, index) => {
                            const tool = DataConstant.TOOLS.find(
                              (tool) => tool.id === item
                            );
                            return tool?.name;
                          })
                        : name}
                    </Link>
                  )}
                  {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="py-3 space-y-2">
        <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
          <p className="font-bold">Instructions</p>
          <MyButton
            onClick={() => {}}
            variant="ghost"
            className="px-1 py-0 h-fit hover:bg-white"
          >
            <Image src={AllImages.lightIcon} alt="light-icon" className="w-6" />
          </MyButton>
        </div>
        {/* <p className="border p-2 text-sm rounded-md">
          Select which headline is the clearest example of Kurated slide
          headline best practices
        </p> */}
      </div>

      {params.tools === DataConstant.HEADLINE_TOOL_ID && (
        <div>
          {tab === "EASY" && <HeadlineBeginnerExercise data={exercise} />}

          {tab === "ADVANCED" && <HeadlineAdvanceExercise data={exercise} />}
        </div>
      )}
      {params.tools === DataConstant.VERTICAL_LOGIC_TOOL_ID && (
        <div>
          {tab === "EASY" && <VLBeginnerExercise data={exercise} />}
          {tab === "ADVANCED" && <VLAdvanceExercise data={exercise} />}
        </div>
      )}

      {params.tools === DataConstant.HORIZONTAL_LOGIC_TOOL_ID && (
        <div>
          {tab === "EASY" && <HLBeginnerExercise data={exercise} />}
          {tab === "INTERMEDIATE" && <HLIntermediateExercise data={exercise} />}
          {tab === "ADVANCED" && <HLAdvanceExercise data={exercise} />}
        </div>
      )}

      {/* <div className="py-3 space-y-2">
        <div className="bg-gray-100 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
          <p>Feedback</p>
        </div>
        <p className="border p-2 text-sm rounded-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id
          nisl nec nunc ullamcorper faucibus. Vivamus ullamcorper, nulla non
          consequat tempor, lectus risus suscipit arcu, sed aliquam elit lorem
          non lectus. Nulla facilisi. Maecenas ullamcorper nulla nec velit
          fermentum faucibus. Donec gravida, nisl at convallis bibendum, felis
          nulla tempor justo, at convallis leo risus ac risus. Nulla id est
          tincidunt, condimentum odio vitae, efficitur eros. Nulla dictum, elit
          sit amet consequat dictum, lacus justo varius felis, non varius urna
          turpis at sapien. Vivamus nec sollicitudin lectus, non faucibus nunc.
          Mauris euismod, lacus quis dapibus fermentum, justo leo sollicitudin
          arcu, a pretium odio sem sed nulla. Integer at commodo risus. Sed nec
          magna dolor. Sed eleifend odio vel felis consectetur, sit amet tempus
          ex fermentum. Nulla facilisi. Suspendisse ut libero lacinia, fermentum
          leo a, convallis risus. Vivamus ullamcorper consectetur leo, at
          sodales quam tincidunt in. Ut rutrum mauris at ipsum elementum
          vestibulum.
        </p>
      </div>
      <MySpacer className="h-20" />
      <div className="fixed bottom-0 left-0 w-full py-2 px-6 bg-gray-100 flex justify-end">
        <div>
          <MyButton onClick={() => {}} className="uppercase">
            Submit
          </MyButton>
        </div>
      </div> */}
    </div>
  );
}
