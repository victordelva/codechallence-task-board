"use client";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";
import Popup from "@/components/molecules/PopUp";
import { CreateTaskForm } from "@/components/organisms/CreateTaskForm";

export function CreateNewTaskSection({ onSave }: { onSave: () => void }) {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="px-4 pt-4">
        <Button onClick={() => setPopupOpen(true)}>Create new task</Button>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <CreateTaskForm
          onSubmit={() => {
            setPopupOpen(false);
            onSave();
          }}
        />
      </Popup>
    </>
  );
}
