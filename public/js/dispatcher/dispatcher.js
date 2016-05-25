/*eslint-disable no-console */

import {pendingActions} from '../state';
import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher;
const isDev = 'production' !== process.env.NODE_ENV;

export function register(callback) {
  return dispatcher.register(callback);
}

export function waitFor(ids) {
  dispatcher.waitFor(ids);
}

export function dispatch(action, data, options) {
  if (isDev && action.toString === Function.prototype.toString) {
    throw new Error(`Action ${action} toString method has to be overridden by setToString.`);
  }

  const looksLikePromise = data && typeof data.then === 'function';
  if (looksLikePromise) {
    return dispatchAsync(action, data, options);
  } else {
    dispatchSync(action, data);
  }
}

export function isPending(actionName) {
  return pendingActions().has(actionName);
}

function dispatchAsync(action, promise, options) {
  const actionName = action.toString();
  // Pending property is defined lazily.
  if (!action.hasOwnProperty('pending')) {
    Object.defineProperty(action, 'pending', {
      get: () => isPending(actionName)
    });
  }

  if (isPending(actionName) && isDev) {
    console.warn(`Warning: Action ${actionName} is already pending.`);
  }

  if (isDev) {
    console.log(`pending: ${actionName}`);
  }

  setPending(actionName, true);
  return promise.then(
    (data) => {
      setPending(actionName, false);
      dispatchSync(action, data);
      return data;
    },
    (reason) => {
      if (isDev) {
        console.log(`rejected: ${actionName}`);
      }
      setPending(actionName, false);
      throw reason;
    }
  );
}

function setPending(actionName, pending) {
  pendingActions(_pendingActions => pending
    ? _pendingActions.set(actionName, true)
    : _pendingActions.delete(actionName)
  );
}

function dispatchSync(action, data) {
  if (isDev) {
    console.log(`dispatched: ${action}`);
  }
  dispatcher.dispatch({action, data});
}
