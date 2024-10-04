import {TaskRepositoryInterface} from "@/contexts/board/domain/interfaces/task-repository.interface";

let mockTaskRepository: jest.Mocked<TaskRepositoryInterface>;

mockTaskRepository = {
	findAll: jest.fn(),
	save: jest.fn(),
};

export default mockTaskRepository;