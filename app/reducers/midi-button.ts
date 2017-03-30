import { ActionReducer, Action } from '@ngrx/store';
import { AppStateRecord } from '../app-state';

export const TOGGLE = 'TOGGLE';
export const SUSTAIN = 'SUSTAIN';

export const VOLUME_UP = 'VOLUME_UP:';

export const MidiButtonReducer :ActionReducer<AppStateRecord> = (state :any = makeInitialState(), action :Action) => {
  switch (action.type) {
    case TOGGLE:
      return Object.assign({}, state, {
        [action.payload.id] : !state[action.payload.id]
      });
    case SUSTAIN:
      return Object.assign({}, state);
    default:
      return state;
  }
}

function makeInitialState() {
  return {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false,
    '10': false,
    '11': false,
    '12': false,
  }
}
