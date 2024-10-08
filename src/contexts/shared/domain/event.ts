export class Event {
  id: string;
  path: string;
  payload?: string;
  constructor({
    id,
    path,
    payload,
  }: {
    id: string;
    path: string;
    payload?: string;
  }) {
    this.id = id;
    this.path = path;
    this.payload = payload;
  }
}
