import { EventEmitter } from 'events';

export const globalEvents = new EventEmitter();

export const EVENTS = {
  ASSESSMENT_COMPLETED: 'assessment:completed',
  ASSESSMENT_FAILED: 'assessment:failed',
  LEARNING_PATH_READY: 'learning-path:ready',
};
