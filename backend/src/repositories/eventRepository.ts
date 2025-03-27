import { ApplicationEvent, EventType } from '../types/events';

export abstract class BaseEventRepository {
  /**
   * Saves a new event to the repository
   * @param event The event to save
   */
  abstract save(event: ApplicationEvent): Promise<void>;

  /**
   * Retrieves all events of a specific type
   * @param type The type of events to retrieve
   */
  abstract getEventsByType(type: EventType): Promise<ApplicationEvent[]>;

  /**
   * Retrieves all events that match the given criteria
   * @param criteria Object containing search criteria
   */
  abstract getEvents(criteria: { type?: EventType; userId?: string }): Promise<ApplicationEvent[]>;
} 