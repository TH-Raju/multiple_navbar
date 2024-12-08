"use client";

import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
export function Exercise({ params, searchParams }) {
  // const params = useSearchParams();

  const pathName = usePathname();

  const breadcrumb = [
    ...pathName.split("-").join(" ").split("/").slice(1, -1),
    searchParams.tab,
    `Exercise  ${searchParams.exercise_id}`,
  ];

  const exercise = exerciseData.find(
    (item) => item.id === searchParams.exercise_id
  );

  return (
    <div>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <>
                <BreadcrumbItem className="font-semibold capitalize text-xs md:text-sm">
                  {/* <Link href="/">{item}</Link> */}
                  {item}
                </BreadcrumbItem>
                {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
              </>
            ))}
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

      {params.tools === "headline" && (
        <div>
          {searchParams.tab === "beginner" && (
            <HeadlineBeginnerExercise data={exercise} />
          )}

          {searchParams.tab === "advance" && (
            <HeadlineAdvanceExercise data={exercise} params={params} />
          )}
        </div>
      )}
      {params.tools === "vertical-logic" && (
        <div>
          {searchParams.tab === "beginner" && (
            <VLBeginnerExercise data={exercise} />
          )}
          {searchParams.tab === "advance" && (
            <VLAdvanceExercise data={exercise} />
          )}
        </div>
      )}

      {params.tools === "horizontal-logic" && (
        <div>
          {searchParams.tab === "beginner" && <HLBeginnerExercise />}
          {searchParams.tab === "intermediate" && <HLIntermediateExercise />}
          {searchParams.tab === "advance" && <HLAdvanceExercise />}
        </div>
      )}

      <div className="py-3 space-y-2">
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
      </div>
    </div>
  );
}
