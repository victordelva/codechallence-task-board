import { TaskRepositoryInterface } from "@/contexts/board/domain/interfaces/task-repository.interface";

const mockTaskRepository: jest.Mocked<TaskRepositoryInterface> = {
  findAll: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
};

export default mockTaskRepository;
