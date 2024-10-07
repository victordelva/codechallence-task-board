import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";

export class UpdateTaskFromBoardRequest {
	id: string;
	status?: TaskStatus;
	title?: string;

	constructor({
		id,
		status,
		title,
  }: {
		id: string;
		status?: TaskStatus;
		title?: string;
  }) {
		this.id = id;
		this.status = status;
		this.title = title;
	}
}