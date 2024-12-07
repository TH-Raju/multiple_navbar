"use client";

import { AllImages } from "@/assets/AllImages";
import MySpacer from "@/components/shared/common/my-spacer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { useState } from "react";

import { CSS } from "@dnd-kit/utilities";

const Items = [
  {
    id: "1",
    title: "Total Win Split ",
    intro:
      "This bar shows the percentage of rounds for the given topic where the team who won was AFF or Neg team won.",
    element: "#topics-tour-tws",
  },
  {
    id: "2",
    title: "Preliminary Win Split",
    intro:
      "This bar shows the percentage of preliminary rounds for the given topic where the team who won was AFF or Neg.",
    element: "#topics-tour-prelimws",
  },
];
export const HLAdvanceExercise = () => {
  const containers = ["A", "B", "C", "D"];
  const [parent, setParent] = useState(null);
  const [items, setItems] = useState(Items);

  const getTaskPos = (id?: string) => items.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    setItems((tasks) => {
      const originalPos = getTaskPos(active.id.toString());
      const newPos = getTaskPos(over?.id.toString());

      return arrayMove(tasks, originalPos, newPos);
    });
  };
  return (
    <div className="bg-white p-3">
      <div className="pb-3 space-y-2">
        <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
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

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Items.map((item) => (
              <SortableItem id={item.id.toString()}>
                <div
                  className="bg-gray-200 p-2 rounded-md space-y-3"
                  key={item.id}
                >
                  <div>
                    <Image
                      src={AllImages.chartImage}
                      alt="light-icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sml">
                    {item.id}. Global smartphone sales have increased by nearly
                    40% over the past 8 years
                  </p>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
        {/* <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {items.map((i) => (
              <SortableItem id={i.id}>
                <p>{i.title}</p>
              </SortableItem>
            ))}
          </div>
        </SortableContext> */}
      </DndContext>

      <MySpacer className="h-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            className="bg-gray-200 p-2 rounded-md space-y-3 h-40"
            key={item}
          ></div>
        ))}
      </div>
    </div>
  );
};

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      {children}
    </div>
  );
}
