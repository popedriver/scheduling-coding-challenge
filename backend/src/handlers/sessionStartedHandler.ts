import { BaseEventHandler } from './baseHandler';
import { ApplicationEvent, SessionStarted } from '../types/events';
import { sessionStorage } from '../services/sessionStorage';

export class SessionStartedHandler extends BaseEventHandler {
  constructor() {
    super('SESSION_STARTED');
  }

  protected async handle(event: ApplicationEvent): Promise<void> {
    if (event.type !== 'SESSION_STARTED') return;
    
    const sessionStartedEvent = event as SessionStarted;
    
    // Check if user already has an active session
    // !!!!! QUESTION: does querying here break event-driven principles?
    if (sessionStorage.hasActiveSession(sessionStartedEvent.userId)) {
      throw new Error(`User ${sessionStartedEvent.userId} already has an active session`);
    }

    // Validate that a mode was selected
    if (!sessionStartedEvent.mode) {
      throw new Error('Mode must be selected when starting a session');
    }

    // Create the new session
    const session = sessionStorage.createSession(sessionStartedEvent);
    console.log(`Created new session: ${session.sessionId} for user: ${session.userId}`);
  }
} 