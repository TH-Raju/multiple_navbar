"use client";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"; // Correct imports
import { useState } from "react";

const initialTopItems = [
  { id: "1", text: "Item 1", image: "chart1.png" },
  { id: "2", text: "Item 2", image: "chart2.png" },
];

export default function App() {
  const [topItems, setTopItems] = useState(initialTopItems);
  const [bottomBox, setBottomBox] = useState([]); // Only one box

  const handleDrop = (event) => {
    const draggedItemId = event.active.id;

    // Handle drag to the top section
    if (event.over?.id === "top") {
      const draggedItem = bottomBox.find((item) => item.id === draggedItemId);
      if (draggedItem) {
        setBottomBox((prev) =>
          prev.filter((item) => item.id !== draggedItemId)
        );
        setTopItems((prev) => [...prev, draggedItem]);
      }
      return;
    }

    // Handle drag from top to bottom box
    const draggedItem = topItems.find((item) => item.id === draggedItemId);
    if (draggedItem) {
      setTopItems((prev) => prev.filter((item) => item.id !== draggedItemId));
      setBottomBox((prev) => [...prev, draggedItem]);
    }
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      {/* Top Section */}
      <Droppable id="top">
        <div style={styles.topSection}>
          <h3>Top Section</h3>
          <div style={styles.grid}>
            {topItems.map((item) => (
              <Draggable key={item.id} id={item.id}>
                <div style={styles.card}>
                  <img
                    src={item.image}
                    alt="item"
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <p>{item.text}</p>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </Droppable>

      {/* Bottom Section with sortable items */}
      <div style={styles.bottomSection}>
        <h3>Bottom Section</h3>
        <SortableContext
          items={bottomBox} // Ensure you're passing correct ids
          strategy={verticalListSortingStrategy} // Or horizontalListSortingStrategy based on your need
        >
          <div style={styles.grid}>
            <Droppable id="box1">
              <div style={styles.box}>
                <p>Box 1</p>
                {bottomBox.map((item) => (
                  <SortableItem key={item.id} id={item.id.toString()}>
                    <div style={styles.card}>
                      <img
                        src={item.image}
                        alt="item"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <p>{item.text}</p>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </Droppable>
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}

function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function Droppable({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
}

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

const styles = {
  topSection: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
    background: "#f9f9f9",
  },
  bottomSection: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f1f1f1",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  card: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    background: "#fff",
    cursor: "pointer",
  },
  box: {
    minHeight: "150px",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    background: "#e9e9e9",
  },
};
