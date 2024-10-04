import {TaskStatus} from "@/board-context/domain/task-status.enum";

export class Task {
	id: string;
	status: TaskStatus;

	constructor({
		id,
		status,
	}:{
		id: string, status: TaskStatus
	}) {
		this.id = id;
		this.status = status;
	}
}
