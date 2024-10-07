import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import {Task} from "@/contexts/board/domain/models/task";
import {InvalidTaskMovementError} from "@/contexts/board/domain/errors/invalid-task-movement.error";

export class Board {
	tasks: Task[];

	constructor({tasks}: {tasks: Task[]}) {
		this.tasks = tasks;
	}

	private statusRestrictions: { [key in TaskStatus]: TaskStatus[] } = {
		[TaskStatus.BACKLOG]: [TaskStatus.TODO],
		[TaskStatus.TODO]: [TaskStatus.BACKLOG, TaskStatus.DOING],
		[TaskStatus.DOING]: [TaskStatus.TODO, TaskStatus.DONE],
		[TaskStatus.DONE]: [],
	};

	private maxCardsInColumn: { [key in Partial<TaskStatus>]: number|null } = {
		[TaskStatus.BACKLOG]: null,
		[TaskStatus.TODO]: null,
		[TaskStatus.DOING]: 2,
		[TaskStatus.DONE]: null,
	};

	getTasksInStatus(status: TaskStatus): Task[] {
		return this.tasks.filter((task) => task.status === status);
	}

	getPossibleMoves(task: Task): TaskStatus[] {
		let statuses = this.statusRestrictions[task.status];
		statuses = statuses.filter((status) => {
			const maxCards = this.maxCardsInColumn[status];
			if (maxCards === null) {
				return true;
			}

			const tasksInStatus = this.getTasksInStatus(status);
			return tasksInStatus.length < maxCards;
		});
		return statuses;
	}

	moveTask(task: Task, status: TaskStatus): Task {
		if (!this.getPossibleMoves(task).includes(status)) {
			throw new InvalidTaskMovementError();
		}

		task.update({status});
		return task;
	}
}