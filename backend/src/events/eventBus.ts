import { ApplicationEvent, EventType } from '../types/events';

class EventBus {
  private static instance: EventBus;
  private listeners: Map<EventType, Array<(event: ApplicationEvent) => void>>;

  private constructor() {
    this.listeners = new Map();
  }

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public publish(eventType: EventType, event: ApplicationEvent): void {
    const eventListeners = this.listeners.get(eventType);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(event));
    }
  }

  public subscribe(eventType: EventType, listener: (event: ApplicationEvent) => void): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)?.push(listener);
  }

  public unsubscribe(eventType: EventType, listener: (event: ApplicationEvent) => void): void {
    const eventListeners = this.listeners.get(eventType);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// Export a singleton instance
export const eventBus = EventBus.getInstance(); 