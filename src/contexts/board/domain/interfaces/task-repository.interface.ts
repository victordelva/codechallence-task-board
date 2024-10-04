import {Task} from "@/contexts/board/domain/models/task";

export interface TaskRepositoryInterface {
	findAll(): Promise<Task[]>;
	save(task: Task): Promise<void>;
}