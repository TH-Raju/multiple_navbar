"use client";

import {
  DndContext,
  DragOverlay,
  rectIntersection,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { useState } from "react";

import { CSS } from "@dnd-kit/utilities";

export const HLAdvanceExercise = () => {
  const [progressItems, setProgressItems] = useState([
    {
      id: "1",
      title: "Total Win Split ",
      intro: "This bar shows the percentage ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimYP983b4y0gJ73MBUc7E0HZcu15pV8ytTQ&s",
    },
    {
      id: "2",
      title: "Preliminary Win Split",
      intro: " preliminary rounds for the given topic where.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimYP983b4y0gJ73MBUc7E0HZcu15pV8ytTQ&s",
    },
    {
      id: "3",
      title: " Win Split",
      intro:
        "preliminary rounds for the given topic where the team who won was AFF or Neg.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimYP983b4y0gJ73MBUc7E0HZcu15pV8ytTQ&s",
    },
    {
      id: "4",
      title: "Win",
      intro: "This bar shows the percentage ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimYP983b4y0gJ73MBUc7E0HZcu15pV8ytTQ&s",
    },
  ]);
  const [doneItems, setDoneItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);

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

  return (
    <div>
      <p className="border p-2 text-sm rounded-md font-medium">
        Rearrange the provided slides into the strongest narrative storyline,
        considering the context provided
      </p>

      <div className="bg-white p-3 mt-3">
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

        <DndContext
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
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, index) =>
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
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-4 gap-3 z-20">
          {items.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </div>
        {items.length < 1 && (
          <div className="grid grid-cols-4 gap-3">
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
        <div>
          <Image
            src={data.img}
            alt="light-icon"
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sml">{data.title}</p>
      </div>
    </div>
  );
};
