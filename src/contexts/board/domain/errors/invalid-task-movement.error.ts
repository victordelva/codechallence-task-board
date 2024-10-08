import { HttpError } from "@/contexts/shared/domain/errors/http.error";

export class InvalidTaskMovementError extends HttpError {
  constructor() {
    super("Invalid task movement", 409);
  }
}
