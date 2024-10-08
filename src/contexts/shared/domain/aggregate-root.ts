import { Event } from "@/contexts/shared/domain/event";

export abstract class AggregateRoot {
  events: Event[];
  constructor() {
    this.events = [];
  }
}
