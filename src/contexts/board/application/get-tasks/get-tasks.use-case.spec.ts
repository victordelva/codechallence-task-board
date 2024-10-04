import {GetTasksUseCase} from "@/contexts/board/application/get-tasks/get-tasks.use-case";
import {TaskRepositoryInterface} from "@/contexts/board/domain/interfaces/task-repository.interface";
import {TaskMother} from "@/contexts/board/domain/models/task.mother";
import {Task} from "@/contexts/board/domain/models/task";
import {GetTasksResponse} from "@/contexts/board/application/get-tasks/get-tasks.response";

describe('GetTasksUseCase unit test', () => {
	let getTasksUseCase: GetTasksUseCase;
	let mockTaskRepository: jest.Mocked<TaskRepositoryInterface>;

	beforeAll(() => {
		mockTaskRepository = {
			findAll: jest.fn(),
			save: jest.fn(),
		};

		getTasksUseCase = new GetTasksUseCase(
			mockTaskRepository
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