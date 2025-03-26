import { BaseEventHandler } from './baseHandler';
import { ApplicationEvent, SampleEvent } from '../types/events';

export class SampleEventHandler extends BaseEventHandler {
  constructor() {
    super('SAMPLE_EVENT');
  }

  protected async handle(event: ApplicationEvent): Promise<void> {
    if (event.type !== 'SAMPLE_EVENT') return;
    
    const sampleEvent = event as SampleEvent;
    console.log(`Handling sample event: ${sampleEvent.data.message}`);
    
    // Add your event handling logic here
  }
} 