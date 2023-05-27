import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import User from "./components/User";

function App() {
  const [people, setPeople] = useState([
    { name: "Ro", id: 1 },
    { name: "Mari", id: 2 },
    { name: "Vale", id: 3 },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const oldIndex = people.findIndex((person) => person.id === active.id);
    const newIndex = people.findIndex((person) => person.id === over.id);

    const newOrder = arrayMove(people, oldIndex, newIndex);
    setPeople(newOrder);
  };
  return (
    <div className="flex justify-center items-center">
      <div className=" w-4/6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <h1 className="text-2xl font-bold">Users List</h1>

          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((user) => (
              <User user={user} key={user.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
