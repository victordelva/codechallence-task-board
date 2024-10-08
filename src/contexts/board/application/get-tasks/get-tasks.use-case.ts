import { TaskRepositoryInterface } from "@/contexts/board/domain/interfaces/task-repository.interface";
import { GetTasksResponse } from "@/contexts/board/application/get-tasks/get-tasks.response";

export class GetTasksUseCase {
  private taskRepository: TaskRepositoryInterface;

  constructor({ taskRepository }: { taskRepository: TaskRepositoryInterface }) {
    this.taskRepository = taskRepository;
  }

  async execute() {
    return (await this.taskRepository.findAll()).map((t) =>
      GetTasksResponse.fromDomain(t),
    );
  }
}
