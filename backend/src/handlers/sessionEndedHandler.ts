import { BaseEventHandler } from './baseHandler';
import { ApplicationEvent, SessionEnded } from '../types/events';
import { sessionRepository } from '../repositories/repository';

export class SessionEndedHandler extends BaseEventHandler {
  constructor() {
    super('SESSION_ENDED');
  }

  protected async handle(event: ApplicationEvent): Promise<void> {
    if (event.type !== 'SESSION_ENDED') return;
    
    const sessionEndedEvent = event as SessionEnded;
   
    // Get the user's active session by checking event history
    const activeSession = await sessionRepository.getActiveSession(sessionEndedEvent.userId);
    if (!activeSession) {
      console.log(`No active session found for user ${sessionEndedEvent.userId}`);
      return;
    }
    
    // Save the session end event
    await sessionRepository.save(sessionEndedEvent);
    console.log(`Session ${activeSession.sessionId} ended`);
  }
} 