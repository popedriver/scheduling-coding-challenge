import { ApplicationEvent, EventType, SessionStarted, SessionEnded } from '../types/events';
import { BaseEventRepository } from './eventRepository';

export class SessionRepository extends BaseEventRepository {
  private events: (SessionStarted | SessionEnded)[] = [];

  async save(event: ApplicationEvent): Promise<void> {
    if (event.type !== 'SESSION_STARTED' && event.type !== 'SESSION_ENDED') {
      throw new Error('SessionRepository only handles session events');
    }
    this.events.push(event as SessionStarted | SessionEnded);

    // DEBUG: Log event history
    console.log('\n=== Event History ===');
    this.events.forEach((e, index) => {
      console.log(`Event ${index + 1}:`, {
        type: e.type,
        timestamp: e.timestamp,
        userId: e.userId,
        ...(e.type === 'SESSION_STARTED' ? { sessionId: e.sessionId } : {})
      });
    });
    console.log('==================\n');
  }

  async getEventsByType(type: EventType): Promise<ApplicationEvent[]> {
    if (type !== 'SESSION_STARTED' && type !== 'SESSION_ENDED') {
      return [];
    }
    return this.events.filter(event => event.type === type);
  }

  async getEvents(criteria: { type?: EventType; userId?: string }): Promise<ApplicationEvent[]> {
    return this.events.filter(event => {
      if (criteria.type && event.type !== criteria.type) return false;
      if (criteria.userId && event.userId !== criteria.userId) return false;
      return true;
    });
  }

  // Convenience methods specific to sessions
  async getActiveSession(userId: string): Promise<SessionStarted | null> {
    // Get all events for the user
    const userEvents = await this.getEvents({ userId });
    
    // Look at the most recent event (last in the array)
    const mostRecentEvent = userEvents[userEvents.length - 1];
    if (!mostRecentEvent) return null;

    // If the most recent event is a SESSION_ENDED, there's no active session
    if (mostRecentEvent.type === 'SESSION_ENDED') return null;

    // If it's a SESSION_STARTED, that's our active session
    return mostRecentEvent as SessionStarted;
  }
} 