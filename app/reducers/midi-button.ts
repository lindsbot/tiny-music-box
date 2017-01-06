import { ActionReducer, Action } from '@ngrx/store';

export const TOGGLE = 'TOGGLE';
export const VOLUME_UP = 'VOLUME_UP:';

export const MidiButtonReducer :ActionReducer<any> = (state :boolean = false, action :Action) => {
  switch (action.type) {
    case TOGGLE:
      if (state === true) {
        return false;
      } else {
        return true;
      }

    default:
      return state;
  }
}