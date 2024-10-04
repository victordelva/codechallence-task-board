import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import {Task} from "@/contexts/board/domain/models/task";
import {v4} from "uuid";

export class TaskMother {
	static random({
		              id,
		              status,
		              title
	} : {
		id?: string,
		status?: TaskStatus,
		title?: string,
	} = {}): Task {
		return new Task({
			id: id ||  v4(),
			status:status || TaskStatus.BACKLOG,
			title: title || 'Task Title'
		});
	}
}
