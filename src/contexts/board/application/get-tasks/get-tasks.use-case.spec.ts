import {GetTasksUseCase} from "@/contexts/board/application/get-tasks/get-tasks.use-case";
import {TaskMother} from "@/contexts/board/domain/models/task.mother";
import {Task} from "@/contexts/board/domain/models/task";
import {GetTasksResponse} from "@/contexts/board/application/get-tasks/get-tasks.response";
import mockTaskRepository from "@/contexts/board/__mocks__/task-respository.mock";

describe('GetTasksUseCase unit test', () => {
	let getTasksUseCase: GetTasksUseCase;

	beforeAll(() => {
		getTasksUseCase = new GetTasksUseCase(
			{taskRepository: mockTaskRepository}
		);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns all tasks', async () => {
		const tasks: Task[] = [
			TaskMother.random(),
			TaskMother.random(),
		];

		mockTaskRepository.findAll.mockResolvedValue(tasks);

		const tasksResponse = await getTasksUseCase.execute();

		expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1);

		expect(tasksResponse).toEqual(tasks.map((t) => GetTasksResponse.fromDomain(t)));
	});
});