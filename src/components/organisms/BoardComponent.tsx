"use client"
import Column from "@/components/organisms/Column";
import {useTasksByStatus} from "@/contexts/board/infrastructure/hooks/useTasksByStatus";
import TaskComponent from "@/components/organisms/TaskComponent";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import Popup from "@/components/molecules/PopUp";
import {useEffect, useState} from "react";
import {Task} from "@/contexts/board/domain/models/task";
import {Board} from "@/contexts/board/domain/models/board";
import {TaskForm} from "@/components/scenes/TaskForm";


export function BoardComponent() {
	const {data: tasksByStatus, all: tasks, refetch} = useTasksByStatus();
	const [showPopup, setShowPopup] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [selectedTaskPossibleMoves, setSelectedTaskPossibleMoves] = useState<TaskStatus[]>([]);

	useEffect(() => {
		if (selectedTask) {
			const board = new Board({tasks});
			const possibleMoves = board.getPossibleMoves(selectedTask);
			setSelectedTaskPossibleMoves(possibleMoves);
		}
	}, [tasks, selectedTask]);

	return (
		<>
			<div className="flex overflow-x-scroll h-dvh m-2">
				{Object.keys(TaskStatus).map((status) => (
					<Column
						key={status}
						title={status}
					>
						{tasksByStatus[status as TaskStatus]?.map(task => (
							<TaskComponent
								id={task.id}
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
				))};
			</div>

			<Popup
				isOpen={showPopup}
				onClose={() => setShowPopup(false)}
			>
				{selectedTask &&
					<TaskForm
							id={selectedTask.id}
							title={selectedTask.title}
							status={selectedTask.status}
							possibleMoves={selectedTaskPossibleMoves}
							onSave={async () => {
								refetch();
								setShowPopup(false);
							}}
					/>}
			</Popup>
		</>
	);
}