import {TaskStatus} from "@/contexts/board/domain/task-status.enum";

export class Task {
	id: string;
	status: TaskStatus;

	constructor({
		id,
		status,
	}:{
		id: string,
		status: TaskStatus
	}) {
		this.id = id;
		this.status = status;
	}
}
