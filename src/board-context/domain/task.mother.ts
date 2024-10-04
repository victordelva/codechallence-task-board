import {TaskStatus} from "@/board-context/domain/task-status.enum";
import {Task} from "@/board-context/domain/task";
import {v4} from "uuid";

export class TaskMother {
	static random({id, status} : {id?: string, status?: TaskStatus} = {}): Task {
		return new Task({id: id ||  v4(), status: status || TaskStatus.BACKLOG});
	}
}
