import { Action, Dispatch, MiddlewareAPI } from 'redux';

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  console.group(action.type);
  console.debug('dispatching', action);
  const result = next(action);
  console.debug('next state', store.getState());
  console.groupEnd();
  return result;
};
