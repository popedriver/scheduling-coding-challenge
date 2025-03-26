// Base interface for all events
export interface BaseEvent {
  id: string;
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

// Union type of all possible events - will be expanded
export type ApplicationEvent = SampleEvent; 