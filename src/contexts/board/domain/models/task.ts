import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import {v4} from "uuid";

export class Task {
	id: string;
	status: TaskStatus;
	title: string;

	constructor({
		id,
		status,
		title,
	}:{
		id: string,
		status: TaskStatus
		title: string,
	}) {
		this.id = id;
		this.status = status;
		this.title = title;
	}

	static create = ({
		status,
		title,
	}: {
		status?: TaskStatus,
		title: string,
	}) => {
		return new Task({
			id: v4(),
			status: status || TaskStatus.BACKLOG,
			title,
		});
	}
}
