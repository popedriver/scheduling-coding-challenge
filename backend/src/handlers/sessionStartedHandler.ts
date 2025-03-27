import { BaseEventHandler } from './baseHandler';
import { ApplicationEvent, SessionStarted } from '../types/events';
import { sessionRepository } from '../repositories/repository';

export class SessionStartedHandler extends BaseEventHandler {
  constructor() {
    super('SESSION_STARTED');
  }

  protected async handle(event: ApplicationEvent): Promise<void> {
    if (event.type !== 'SESSION_STARTED') return;
    
    const sessionStartedEvent = event as SessionStarted;
    
    // Check if user already has an active session by checking event history
    const activeSession = await sessionRepository.getActiveSession(sessionStartedEvent.userId);
    if (activeSession) {
      throw new Error(`User ${sessionStartedEvent.userId} already has an active session`);
    }

    // Save the session start event
    await sessionRepository.save(sessionStartedEvent);
    console.log(`Created new session: ${sessionStartedEvent.sessionId} for user: ${sessionStartedEvent.userId}`);
  }
} 