import { Task } from "@/contexts/board/domain/models/task";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";

export type TaskType = {
  id: string;
  title: string;
  status: string;
};

export function taskMapperToDomain(task: TaskType) {
  if (!task.id || !task.status) {
    throw new Error("Invalid task");
  }

  return new Task({
    ...task,
    status: task.status as TaskStatus,
  });
}
