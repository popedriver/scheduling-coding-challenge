// Base interface for all events
export interface BaseEvent {
  timestamp: Date;
  type: string;
}

// Event type registry - defines all possible event types in the system
export type EventType = 'SESSION_STARTED' | 'SESSION_ENDED';

// event to start a blocking session
export interface SessionStarted extends BaseEvent {
  type: 'SESSION_STARTED';
  sessionId: string;
  userId: string;
}

// event to end a blocking session
export interface SessionEnded extends BaseEvent {
  type: 'SESSION_ENDED';
  userId: string;
}

// Union type of all possible events
export type ApplicationEvent = SessionStarted | SessionEnded; 