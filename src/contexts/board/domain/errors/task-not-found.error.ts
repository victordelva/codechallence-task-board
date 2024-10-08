import { NotFoundError } from "@/contexts/shared/domain/errors/not-found.error";

export class TaskNotFoundError extends NotFoundError {
  constructor() {
    super("Task not found");
  }
}
