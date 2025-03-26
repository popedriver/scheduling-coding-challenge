import { BaseEventHandler } from './baseHandler';
import { ApplicationEvent, SessionEnded } from '../types/events';
import { sessionStorage } from '../services/sessionStorage';

export class SessionEndedHandler extends BaseEventHandler {
  constructor() {
    super('SESSION_ENDED');
  }

  protected async handle(event: ApplicationEvent): Promise<void> {
    if (event.type !== 'SESSION_ENDED') return;
    
    const sessionEndedEvent = event as SessionEnded;
   
    // TODO: Potential validations (is this in the spirit of EDA, or should validations happen elsewhere??):
    // 1. Check if session exists
    // 2. Verify the session belongs to the user who's ending it
    // 3. Check if the session is already ended    

    // Get the user's active session
    const activeSession = sessionStorage.getActiveSession(sessionEndedEvent.userId);
    if (!activeSession) {
      console.log(`No active session found for user ${sessionEndedEvent.userId}`);
      return;
    }
    
    // End the session
    const success = sessionStorage.endSession(activeSession.sessionId);
    console.log(`Session ${activeSession.sessionId} ended: ${success ? 'success' : 'failed'}`);
  }
} 