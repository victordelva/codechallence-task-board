import {TaskRepositoryInterface} from "@/contexts/board/domain/interfaces/task-repository.interface";
import {Task} from "@/contexts/board/domain/models/task";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import {UpdateTaskFromBoardRequest} from "@/contexts/board/application/update-task-from-board/update-task-from-board.request";
import {TaskNotFoundError} from "@/contexts/board/domain/errors/task-not-found.error";
import {Board} from "@/contexts/board/domain/models/board";

export class UpdateTaskFromBoardUseCase {
	private taskRepository: TaskRepositoryInterface;

	constructor({taskRepository}: {taskRepository: TaskRepositoryInterface}) {
		this.taskRepository = taskRepository;
	}

	async execute(request: UpdateTaskFromBoardRequest) {
		const allTasks = await this.taskRepository.findAll();
		const board = new Board({
			tasks: allTasks,
		});

		let task = await this.taskRepository.findById(request.id);

		if (!task) {
			throw new TaskNotFoundError();
		}

		task = board.moveTask(task, request.status as TaskStatus);

		task.update({
			title: request.title,
		});

		await this.taskRepository.save(task);
	}
}