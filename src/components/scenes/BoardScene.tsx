"use client";
import Column from "@/components/organisms/Column";
import { useTasksByStatus } from "@/contexts/board/infrastructure/hooks/useTasksByStatus";
import TaskComponent from "@/components/organisms/TaskComponent";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";
import Popup from "@/components/molecules/PopUp";
import { useEffect, useState } from "react";
import { Task } from "@/contexts/board/domain/models/task";
import { Board } from "@/contexts/board/domain/models/board";
import { UpdateTaskForm } from "@/components/organisms/UpdateTaskForm";
import { CreateNewTaskSection } from "@/components/molecules/CreateNewTaskSection";

export function BoardScene() {
  const { data: tasksByStatus, all: tasks, refetch } = useTasksByStatus();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskPossibleMoves, setSelectedTaskPossibleMoves] = useState<
    TaskStatus[]
  >([]);

  useEffect(() => {
    if (selectedTask) {
      const board = new Board({ tasks });
      const possibleMoves = board.getPossibleMoves(selectedTask);
      setSelectedTaskPossibleMoves(possibleMoves);
    }
  }, [tasks, selectedTask]);

  return (
    <>
      <CreateNewTaskSection onSave={refetch} />
      <div className="flex overflow-x-scroll h-dvh m-2">
        {Object.values(TaskStatus).map((status) => (
          <Column
            key={status}
            status={status}
            totalTasks={tasksByStatus[status as TaskStatus]?.length || 0}
          >
            {tasksByStatus[status]?.map((task) => (
              <TaskComponent
                title={task.title}
                key={task.id}
                status={task.status}
                onClick={() => {
                  setSelectedTask(task);
                  setShowPopup(true);
                }}
              />
            ))}
          </Column>
        ))}
        ;
      </div>

      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        {selectedTask && (
          <UpdateTaskForm
            id={selectedTask.id}
            title={selectedTask.title}
            status={selectedTask.status}
            possibleMoves={selectedTaskPossibleMoves}
            onSave={async () => {
              refetch();
              setShowPopup(false);
            }}
          />
        )}
      </Popup>
    </>
  );
}
