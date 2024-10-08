import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";
import { v4 } from "uuid";

export class Task {
  id: string;
  status: TaskStatus;
  title: string;

  constructor({
    id,
    status,
    title,
  }: {
    id: string;
    status: TaskStatus;
    title: string;
  }) {
    this.id = id;
    this.status = status;
    this.title = title;
  }

  static create = ({ title }: { title: string }) => {
    return new Task({
      id: v4(),
      status: TaskStatus.BACKLOG,
      title,
    });
  };

  update({ status, title }: { status?: TaskStatus; title?: string }) {
    this.status = status || this.status;
    this.title = title || this.title;
  }
}
