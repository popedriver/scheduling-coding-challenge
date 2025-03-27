import express, { Request, Response, RequestHandler } from 'express';
import { eventBus } from './events/eventBus';
import { SessionStarted, SessionEnded } from './types/events';
import { SessionStartedHandler } from './handlers/sessionStartedHandler';
import { SessionEndedHandler } from './handlers/sessionEndedHandler';

// Initialize handlers
new SessionStartedHandler();
new SessionEndedHandler();

const app = express();
app.use(express.json());

// Start a new session
const startSession: RequestHandler = (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const event: SessionStarted = {
    type: 'SESSION_STARTED',
    timestamp: new Date(),
    userId,
    sessionId: crypto.randomUUID() // Generate a unique session ID
  };

  // Publish event without awaiting
  eventBus.publish('SESSION_STARTED', event);
  res.json({ sessionId: event.sessionId });
};

// End a session
const endSession: RequestHandler = (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const event: SessionEnded = {
    type: 'SESSION_ENDED',
    timestamp: new Date(),
    userId
  };

  // Publish event without awaiting
  eventBus.publish('SESSION_ENDED', event);
  res.json({ success: true });
};

app.post('/sessions/start', startSession);
app.post('/sessions/end', endSession);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
