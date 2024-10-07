import {PrismaTaskRepository} from "@/contexts/board/infrastructure/repositories/prisma-task-repository";
import prisma from "@/contexts/shared/infrastructure/prisma";
import {GetTasksUseCase} from "@/contexts/board/application/get-tasks/get-tasks.use-case";
import {CreateTaskUseCase} from "@/contexts/board/application/create-task/create-task.use-case";
import {
	UpdateTaskFromBoardUseCase
} from "@/contexts/board/application/update-task-from-board/update-task-from-board.use-case";

export const containerDependencies = () => {
	const taskRepository = new PrismaTaskRepository(prisma);

	return {
		taskRepository,
		getTaskUseCase: new GetTasksUseCase({taskRepository}),
		createTaskUseCase: new CreateTaskUseCase({taskRepository}),
		updateTaskFromBoardUseCase: new UpdateTaskFromBoardUseCase({taskRepository}),
	}
}
