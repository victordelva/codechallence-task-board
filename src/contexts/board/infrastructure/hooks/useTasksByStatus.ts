import useSWR from "swr";
import { fetcher } from "@/contexts/shared/infrastructure/fetcher";
import {
  TaskType,
  taskMapperToDomain,
} from "@/contexts/board/infrastructure/mapper/task.mapper";
import { Task } from "@/contexts/board/domain/models/task";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";
import { useEffect, useState } from "react";

export function useTasksByStatus() {
  const { data, error, mutate } = useSWR<{ tasks: TaskType[] }>(
    `/api/tasks`,
    fetcher,
  );
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      try {
        const parsedTasks: TaskType[] = JSON.parse(localStorageTasks);
        const mappedTasks = parsedTasks.map(taskMapperToDomain);
        setTasks(mappedTasks);
      } catch (e) {
        console.error("Error parsing localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (data?.tasks) {
      const mappedTasks = data.tasks.map(taskMapperToDomain);
      setTasks(mappedTasks);
      try {
        localStorage.setItem("tasks", JSON.stringify(data.tasks));
      } catch (e) {
        console.error("Error saving localStorage:", e);
      }
    }
  }, [data]);

  const groupedByStatus =
    tasks?.reduce(
      (acc, task) => {
        const status = task.status;
        if (!acc[status]) {
          acc[status] = [];
        }
        (acc[status] as Task[]).push(task);
        return acc;
      },
      {} as { [key in TaskStatus]?: Task[] },
    ) || {};

  return {
    data: groupedByStatus,
    all: tasks,
    loading: !error && !data,
    error,
    refetch: () => mutate(),
  };
}
