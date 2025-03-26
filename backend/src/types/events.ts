// Base interface for all events
export interface BaseEvent {
  timestamp: Date;
  type: string;
}

// Event type registry - we'll add more specific event types here
export type EventType = 'SAMPLE_EVENT' | string; // Will be expanded based on your requirements

// Sample event interface - this is just a placeholder
export interface SampleEvent extends BaseEvent {
  type: 'SAMPLE_EVENT';
  data: {
    message: string;
  };
}

// event to start a blocking session
export interface SessionStarted extends BaseEvent {
  type: 'SESSION_STARTED';
  sessionId: string;
  userId: string;
  mode: string;
}

// event to end a blocking session
export interface SessionEnded extends BaseEvent {
  type: 'SESSION_ENDED';
  userId: string;
}

// Union type of all possible events
export type ApplicationEvent = SessionStarted | SessionEnded; 