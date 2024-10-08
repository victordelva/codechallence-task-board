import mockTaskRepository from "@/contexts/board/__mocks__/task-respository.mock";
import { CreateTaskUseCase } from "@/contexts/board/application/create-task/create-task.use-case";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";

describe("CreateTaskUseCase unit test", () => {
  let createTaskUseCase: CreateTaskUseCase;

  beforeAll(() => {
    createTaskUseCase = new CreateTaskUseCase({
      taskRepository: mockTaskRepository,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a task and return the id", async () => {
    const id = await createTaskUseCase.execute({
      title: "random title",
    });

    expect(mockTaskRepository.save).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.save).toHaveBeenCalledWith({
      id,
      title: "random title",
      status: TaskStatus.BACKLOG,
    });
  });
});
