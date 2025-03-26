import { ApplicationEvent, EventType } from '../types/events';
import { eventBus } from '../events/eventBus';

export abstract class BaseEventHandler {
  protected constructor(protected readonly eventType: EventType) {
    this.initialize();
  }

  private initialize(): void {
    eventBus.subscribe(this.eventType, this.handle.bind(this));
  }

  protected abstract handle(event: ApplicationEvent): Promise<void>;
} 