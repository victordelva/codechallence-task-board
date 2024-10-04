import {TaskStatus} from "@/board-context/domain/task-status.enum";
import {Task} from "@/board-context/domain/task";

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
}