"use client";

import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { useGetSLAllContentQuery } from "@/redux/feature/storylining/storylining-api";
import { useMarkContentAsCompletedMutation } from "@/redux/feature/tools/tools-api";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  rectIntersection,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CSS } from "@dnd-kit/utilities";

export const HLAdvanceExercise = ({ data }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = data?.difficulty;
  const toolsId = data?.tool_id;

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [progressItems, setProgressItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);

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

  const findContainer = (id) => {
    if (progressItems.some((item) => item?.id === id)) return "progress";
    if (doneItems.some((item) => item.id === id)) return "done";
    return null;
  };

  const handleDragStart = (event) => {
    const draggedItem =
      progressItems.find((item) => item?.id === event.active.id) ||
      doneItems.find((item) => item.id === event.active.id);
    setActiveId(event.active.id);
    setDraggingItem(draggedItem);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer =
      over.id === "progress" || over.id === "done"
        ? over.id
        : findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    if (activeContainer === "progress") {
      const movedItemIndex = progressItems.findIndex(
        (item) => item?.id === active.id
      );

      if (movedItemIndex !== -1) {
        const movedItem = progressItems[movedItemIndex];
        setProgressItems((items) =>
          items.map((item, index) => (index === movedItemIndex ? null : item))
        ); // Mark the index as null
        setDoneItems((items) => [...items, movedItem]); // Add to doneItems
      }
    } else if (activeContainer === "done") {
      const movedItemIndex = doneItems.findIndex(
        (item) => item.id === active.id
      );

      if (movedItemIndex !== -1) {
        const movedItem = doneItems[movedItemIndex];
        setDoneItems((items) => items.filter((item) => item.id !== active.id)); // Remove from doneItems
        setProgressItems((items) => {
          const nullIndex = items.findIndex((item) => item === null);
          return items.map((item, index) =>
            index === nullIndex ? movedItem : item
          );
        }); // Fill the first null spot in progressItems
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (activeContainer === "done" && overContainer === "done") {
        // Reorder the doneItems array when items are moved inside the done column
        const oldIndex = doneItems.findIndex((item) => item.id === active.id);
        const newIndex = doneItems.findIndex((item) => item.id === over.id);
        setDoneItems((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
    setActiveId(null);
    setDraggingItem(null);
  };

  const updatedData = data?.horizontal_logic_options_unnested?.map(
    ({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    })
  );
  useEffect(() => {
    setProgressItems(updatedData);
  }, [data]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <div>
      <div>
        <p className="border p-2 text-sm rounded-md font-medium">
          {data?.question}
        </p>

        <div className="bg-white p-3 mt-3">
          <div className="pb-3 space-y-2">
            <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
              <p>Context</p>
            </div>
            <div className="border p-3 text-sm rounded-md">
              <ul className="list-disc px-6 space-y-2">
                <li>{data?.horizontal_logic_context}</li>
              </ul>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div style={{ display: "grid", gap: "20px" }}>
              <ProgressColumn items={progressItems} />
              <DoneColumn items={doneItems} />
            </div>
            <DragOverlay>
              {draggingItem ? <Item data={draggingItem} /> : null}
            </DragOverlay>
          </DndContext>
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
          {answer.length > 0 ? (
            <div className=" space-x-2">
              <MyButton
                onClick={() => {
                  setAnswer("");
                  setShowAnswer(false);
                  setFeedback("");
                  setDoneItems([]);
                  setProgressItems(updatedData);
                }}
                className="uppercase"
              >
                Retry
              </MyButton>
              {nextItem && !isLoading && (
                <MyButton
                  onClick={() => {
                    setFeedback("");
                    setAnswer("");
                    setShowAnswer(false);
                    setDoneItems([]);
                    // setProgressItems(updatedData);

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
                  const isOrderMatched = data?.correct_answers?.every(
                    ({ _id }, index) => _id === doneItems[index]?.id
                  );

                  if (isOrderMatched) {
                    setFeedback(data?.default_positive_feedback);
                    setAnswer(data?.correct_answers.map((it) => it._id));
                    setShowAnswer(true);
                    markToolContentAsCompleted(data._id);
                  } else {
                    setAnswer(data?.correct_answers.map((it) => it._id));
                    setFeedback(data?.default_negative_feedback);
                  }
                }}
                className="uppercase"
                loading={isLoading}
              >
                Submit
              </MyButton>

              {nextItem && answer.length > 0 && !isLoading && (
                <MyButton
                  onClick={() => {
                    setFeedback("");
                    setAnswer("");
                    setShowAnswer(false);
                    setDoneItems([]);
                    const updatedData =
                      data?.horizontal_logic_options_unnested?.map(
                        ({ _id, ...rest }) => ({
                          id: _id,
                          ...rest,
                        })
                      );

                    setProgressItems(updatedData);

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

const ProgressColumn = ({ items }) => {
  const { setNodeRef } = useDroppable({ id: "progress" });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "100%",
        minHeight: "160px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div className="grid md:grid-cols-4 gap-3">
        {items.map((item) =>
          item ? (
            <Item key={item.id} data={item} />
          ) : (
            <div className="bg-gray-100 p-2 rounded-md flex items-center justify-center min-h-40"></div>
          )
        )}
      </div>
    </div>
  );
};

const DoneColumn = ({ items }) => {
  const { setNodeRef } = useDroppable({ id: "done" });

  return (
    <div ref={setNodeRef} className="w-full min-h-40 bg-transparent">
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid md:grid-cols-4 gap-3 z-20">
          {items.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </div>
        {items.length < 1 && (
          <div className="grid md:grid-cols-4 gap-3">
            <div className="bg-gray-100 p-2 rounded-md h-36 w-full"></div>
            <div className="bg-gray-100 p-2 rounded-md h-36 w-full"></div>
            <div className="bg-gray-100 p-2 rounded-md h-36 w-full"></div>
            <div className="bg-gray-100 p-2 rounded-md h-36 w-full"></div>
          </div>
        )}
      </SortableContext>
    </div>
  );
};
const Item = ({ data }) => {
  const id = data.id;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-100 p-2 rounded-lg min-h-36`}
    >
      <div className=" space-y-3">
        <div className="h-52">
          <Image
            src={data.data}
            alt="light-icon"
            width={600}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sml">{data.title}</p>
      </div>
    </div>
  );
};
