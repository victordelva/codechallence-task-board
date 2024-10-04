import {TaskRepositoryInterface} from "@/contexts/board/domain/interfaces/task-repository.interface";
import {CreateTaskRequest} from "@/contexts/board/application/create-task/create-task.request";
import {Task} from "@/contexts/board/domain/models/task";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";

export class CreateTaskUseCase {
	private taskRepository: TaskRepositoryInterface;

	constructor({taskRepository}: {taskRepository: TaskRepositoryInterface}) {
		this.taskRepository = taskRepository;
	}

	async execute(task: CreateTaskRequest) {
		const domainTask = Task.create({
			title: task.title,
			status: task.status as TaskStatus,
		});
		await this.taskRepository.save(domainTask);
		return domainTask.id;
	}
}