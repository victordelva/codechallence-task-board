import { Input } from "@/components/atoms/Input";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

export function CreateTaskForm({ onSubmit }: { onSubmit: () => void }) {
  const [title, setTitle] = useState<string | undefined>();
  const isValid = title !== undefined && title.length > 0;

  const save = async () => {
    if (isValid) {
      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      onSubmit();
      setTitle(undefined);
    }
  };

  return (
    <>
      <div className="font-bold text-2xl mb-4">Create a new task</div>
      <div className="my-2">
        <Input
          label="Title"
          className="w-full"
          placeholder="New task title"
          value={title || ""}
          onChange={(v) => setTitle(v)}
        />
        <div className="my-4">
          <Button onClick={save} disabled={!isValid}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
