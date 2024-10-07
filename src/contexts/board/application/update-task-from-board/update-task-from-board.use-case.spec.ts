import {TaskMother} from "@/contexts/board/domain/models/task.mother";
import {Task} from "@/contexts/board/domain/models/task";
import mockTaskRepository from "@/contexts/board/__mocks__/task-respository.mock";
import {UpdateTaskFromBoardUseCase} from "@/contexts/board/application/update-task-from-board/update-task-from-board.use-case";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import {InvalidTaskMovementError} from "@/contexts/board/domain/errors/invalid-task-movement.error";

describe('UpdateTaskFromBoardUseCase unit test', () => {
	let updateTaskUseCase: UpdateTaskFromBoardUseCase;

	beforeAll(() => {
		updateTaskUseCase = new UpdateTaskFromBoardUseCase(
			{taskRepository: mockTaskRepository}
		);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should update a task status and title', async () => {
		const taskToUpdate = TaskMother.random({
			status: TaskStatus.BACKLOG,
		});
		const tasks: Task[] = [
			taskToUpdate,
			TaskMother.random(),
		];

		mockTaskRepository.findAll.mockResolvedValue(tasks);
		mockTaskRepository.findById.mockResolvedValueOnce(taskToUpdate);

		await updateTaskUseCase.execute({
			id: taskToUpdate.id,
			title: "new",
			status: TaskStatus.TODO,
		});

		expect(mockTaskRepository.save).toHaveBeenCalledTimes(1);
		expect(mockTaskRepository.save).toHaveBeenCalledWith({
			id: taskToUpdate.id,
			title: 'new',
			status: TaskStatus.TODO,
		});
	});

	it(
		'should fail to update task status because doesnt follow only one column movement restriction',
		async () => {

		const taskToUpdate = TaskMother.random({
			status: TaskStatus.BACKLOG,
		});
		const tasks: Task[] = [
			taskToUpdate,
			TaskMother.random(),
		];

		mockTaskRepository.findAll.mockResolvedValue(tasks);
		mockTaskRepository.findById.mockResolvedValueOnce(taskToUpdate);

		expect(mockTaskRepository.save).toHaveBeenCalledTimes(0);

		await expect(
			updateTaskUseCase.execute({
				id: taskToUpdate.id,
				status: TaskStatus.DONE,
			})
		).rejects.toThrow(InvalidTaskMovementError);
	});
});