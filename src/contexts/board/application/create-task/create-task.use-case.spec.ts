import {TaskMother} from "@/contexts/board/domain/models/task.mother";
import {Task} from "@/contexts/board/domain/models/task";
import mockTaskRepository from "@/contexts/board/__mocks__/task-respository.mock";
import {CreateTaskUseCase} from "@/contexts/board/application/create-task/create-task.use-case";

describe('CreateTaskUseCase unit test', () => {
	let createTaskUseCase: CreateTaskUseCase;

	beforeAll(() => {
		createTaskUseCase = new CreateTaskUseCase(
			{taskRepository: mockTaskRepository}
		);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('creates a task and return the id', async () => {
		const task: Task =
			TaskMother.random();

		const id = await createTaskUseCase.execute({
			title: task.title,
			status: task.status,
		});

		expect(mockTaskRepository.save).toBeCalledTimes(1);
		expect(mockTaskRepository.save).toHaveBeenCalledWith({
			id,
			title: task.title,
			status: task.status,
		});
	});
});