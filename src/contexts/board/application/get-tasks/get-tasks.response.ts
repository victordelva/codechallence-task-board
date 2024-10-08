import { Task } from "@/contexts/board/domain/models/task";

export class GetTasksResponse {
  id: string;
  title: string;
  status: string;

  constructor({
    id,
    title,
    status,
  }: {
    id: string;
    title: string;
    status: string;
  }) {
    this.id = id;
    this.title = title;
    this.status = status;
  }

  static fromDomain(task: Task) {
    return new GetTasksResponse({
      id: task.id,
      title: task.title,
      status: task.status,
    });
  }
}
