import useSWR from "swr";
import {fetcher} from "@/contexts/shared/infrastructure/fetcher";
import {TaskType, taskMapperToDomain} from "@/contexts/board/infrastructure/mapper/task.mapper";
import {Task} from "@/contexts/board/domain/task";
import {TaskStatus} from "@/contexts/board/domain/task-status.enum";

export function useTasksByStatus() {
	const { data, error, mutate } = useSWR<{ tasks: TaskType[] }>(`/api/tasks`, fetcher);
	const localStorageTasks = localStorage.getItem("tasks");
	let tasks: Task[] = localStorageTasks !== null ?
		JSON.parse(localStorageTasks).map((taskDto: TaskType) => {
			return taskMapperToDomain(taskDto);
		}) : [];

	if (data?.tasks) {
		tasks = data.tasks.map((taskDto: TaskType) => {
			return taskMapperToDomain(taskDto);
		}) || [];
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	const groupedByStatus = tasks?.reduce(
		(acc, task) => {
			const status = task.status;
			if (!acc[status]) {
				acc[status] = [];
			}
			(acc[status] as Task[]).push(task);
			return acc;
		},
		{} as { [key in TaskStatus]?: Task[] }
	) || {};

	return {
		data: groupedByStatus,
		loading: !error && !data,
		error,
		refetch: () => mutate(),
	};
}
