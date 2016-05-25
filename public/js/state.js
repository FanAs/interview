import State from './libs/state';
import {OrderedMap, Map} from 'immutable';

const state = new State({
  pendingActions: Map(),
  contacts: OrderedMap()
});

export default state;

export const pendingActions = state.cursor(['pendingActions']);
export const contacts = state.cursor(['contacts']);
