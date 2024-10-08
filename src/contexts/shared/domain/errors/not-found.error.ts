import { HttpError } from "@/contexts/shared/domain/errors/http.error";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}
