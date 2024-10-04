"use client"
import Column from "@/components/organisms/Column";
import {useTasksByStatus} from "@/contexts/board/infrastructure/hooks/useTasksByStatus";
import TaskComponent from "@/components/organisms/TaskComponent";
import {TaskStatus} from "@/contexts/board/domain/task-status.enum";


export function Board() {
	const {data: tasksByStatus, refetch} = useTasksByStatus();

	return (
		<div className="flex overflow-x-scroll h-dvh m-2">
			{Object.keys(TaskStatus).map((status) => (
				<Column
					key={status}
					title={status}
				>
					{tasksByStatus[status as TaskStatus]?.map(task => (
						<TaskComponent title={task.id} key={task.id}/>
					))}
				</Column>
			))};
		</div>
	);
}