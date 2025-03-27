import { SessionStarted } from '../types/events';

/**
 * This file implements in-memory storage - it serves as a proxy for what would be a database in a real application.
 */

interface Session {
  sessionId: string;
  userId: string;
  startTime: Date;
  isActive: boolean;
}

export class SessionStorage {
  private sessions: Map<string, Session> = new Map();

  /**
   * Creates a new session
   */
  createSession(event: SessionStarted): Session {
    const session: Session = {
      sessionId: event.sessionId,
      userId: event.userId,
      startTime: event.timestamp,
      isActive: true
    };

    this.sessions.set(session.sessionId, session);
    return session;
  }

  /**
   * Retrieves a session by ID
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Checks if a user has any active sessions
   */
  hasActiveSession(userId: string): boolean {
    return Array.from(this.sessions.values()).some(
      session => session.userId === userId && session.isActive
    );
  }

  /**
   * Gets a user's active session
   */
  getActiveSession(userId: string): Session | undefined {
    return Array.from(this.sessions.values()).find(
      session => session.userId === userId && session.isActive
    );
  }

  /**
   * Ends a session
   */
  endSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.isActive = false;
    return true;
  }

  /**
   * Gets all active sessions for a user
   */
  getActiveSessions(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter(
      session => session.userId === userId && session.isActive
    );
  }
}

// Export a singleton instance
export const sessionStorage = new SessionStorage(); 